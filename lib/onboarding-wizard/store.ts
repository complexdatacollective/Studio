import { createStore } from 'zustand';
import type { LocalisedString, LocalisedRecord } from '~/schemas/shared';
import { type LocalStorageState } from '~/lib/createLocalStorageStore';

export const Priorities = {
  ShowFirst: Infinity,
  UI: 100,
  Navigation: 50,
  Task: 10,
  ShowLast: -Infinity,
} as const;

export type Priority = keyof typeof Priorities;

export type Step = {
  targetElementId?: string;
  title: LocalisedString;
  content: LocalisedRecord;
};

export type Wizard = {
  id: string;
  name: LocalisedString;
  description: LocalisedRecord;
  steps: Step[];
  priority: Priority;
};

export type WizardState = {
  wizards: Record<Wizard['id'], Omit<Wizard, 'id'>>;
  currentStep: number; // Only null when there's no active wizard.
  activeWizardId: Wizard['id'] | null;
  progress: {
    current: number;
    total: number;
  };
};

export type WizardActions = {
  registerWizard: (wizard: Wizard) => void;
  deregisterWizard: (id: Wizard['id']) => void;
  setActiveWizard: (id: Wizard['id'] | null) => void;
  nextStep: () => void;
  hasNextStep: () => boolean;
  previousStep: () => void;
  hasPreviousStep: () => boolean;
  getActiveWizard: () => Omit<Wizard, 'id'> | null;
};

export type WizardStore = WizardState & WizardActions;

const defaultInitialState: WizardState = {
  wizards: {},
  currentStep: 0,
  activeWizardId: null,
  progress: {
    current: 0,
    total: 0,
  },
};

export const createWizardStore = (
  getItem: LocalStorageState<boolean>['get'],
  setItem: LocalStorageState<boolean>['set'],
) => {
  // To calculate the progress through _all_ wizards, we need to know the number of steps for all wizards prior to this one (when sorted by priority), and then to add the current step index.
  const calculateCurrentProgress = (
    wizards: WizardState['wizards'],
    activeWizardId: WizardState['activeWizardId'],
    currentStep: number,
  ) => {
    const sortedWizards = Object.entries(wizards)
      .map(([id, wizard]) => ({ id, ...wizard }))
      // .filter((wizard) => !getItem(wizard.id)) // Filter out seen wizards
      .sort((a, b) => Priorities[b.priority] - Priorities[a.priority]);

    const total = sortedWizards.reduce((t, wizard) => {
      return t + wizard.steps.length;
    }, 0);

    const activeWizardIndex = sortedWizards.findIndex(
      (wizard) => wizard.id === activeWizardId,
    );

    const current =
      currentStep +
      sortedWizards.reduce((t, wizard) => {
        const currentWizardIndex = sortedWizards.findIndex(
          (w) => w.id === wizard.id,
        );

        if (wizard.id === activeWizardId) {
          return t;
        }

        if (currentWizardIndex > activeWizardIndex) {
          return t;
        }

        console.log(activeWizardId, 'adding', wizard.steps.length, 'to', t);
        return t + wizard.steps.length;
      }, 0) +
      1;

    console.log({ currentStep, activeWizardId, current, total });

    return { current, total };
  };

  return createStore<WizardStore>()((set, get) => ({
    ...defaultInitialState,
    getActiveWizard: () => {
      const activeWizardId = get().activeWizardId;

      if (!activeWizardId) {
        return null;
      }

      return get().wizards[activeWizardId] ?? null;
    },
    registerWizard: (wizard) => {
      const shouldUpdateProgress = !getItem(wizard.id);

      const { wizards, activeWizardId, currentStep } = get();

      const newWizards = {
        ...wizards,
        [wizard.id]: wizard,
      };

      set((state) => ({
        ...state,
        wizards: newWizards,
        progress: shouldUpdateProgress
          ? calculateCurrentProgress(newWizards, activeWizardId, currentStep)
          : state.progress,
      }));
    },
    deregisterWizard: (id) => {
      const shouldUpdateProgress = !getItem(id);

      const { activeWizardId, currentStep } = get();

      set((state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _, ...wizards } = state.wizards;
        return {
          ...state,
          wizards,
          progress: shouldUpdateProgress
            ? calculateCurrentProgress(wizards, activeWizardId, currentStep)
            : state.progress,
        };
      });
    },
    setActiveWizard: (id) => {
      if (!id) {
        set((state) => ({
          ...state,
          activeWizardId: null,
          currentStep: 0,
          progress: calculateCurrentProgress(state.wizards, id, 0),
        }));

        return;
      }

      const wizards = get().wizards;

      if (!Object.keys(wizards).includes(id)) {
        throw new Error(`Wizard with id ${id} not found`);
      }

      const result = calculateCurrentProgress(wizards, id, 0);
      console.log('results', result, wizards, id);

      set((state) => ({
        ...state,
        activeWizardId: id,
        currentStep: 0,
        progress: result,
      }));
    },
    nextStep() {
      const { wizards, activeWizardId, currentStep } = get();

      if (!activeWizardId) {
        throw new Error('No active wizard found');
      }

      const activeWizard = wizards[activeWizardId]!;
      const hasNextStep = currentStep < activeWizard.steps.length - 1;

      // If there is a next step in the current wizard, move to it
      if (hasNextStep) {
        set((state) => ({
          ...state,
          currentStep: currentStep + 1,
          progress: {
            ...state.progress,
            current: state.progress.current + 1,
          },
        }));

        return;
      }

      // If we are at the last step of the wizard, mark it as seen and move to the next wizard
      setItem(activeWizardId, true);

      // Get the wizard with the next highest priority that has not been seen
      const nextWizard = Object.entries(wizards)
        .map(([id, wizard]) => ({ id, ...wizard }))
        .filter((wizard) => !getItem(wizard.id))
        .sort((a, b) => Priorities[b.priority] - Priorities[a.priority])
        .find((wizard) => wizard.id !== activeWizardId);

      if (nextWizard) {
        set((state) => ({
          ...state,
          activeWizardName: nextWizard.name,
          currentStep: 0,
          progress: calculateCurrentProgress(wizards, nextWizard.id, 0),
        }));

        return;
      }

      // If there are no more wizards, reset the active wizard
      this.setActiveWizard(null);
    },
    previousStep() {
      const { wizards, activeWizardId, currentStep } = get();

      if (!activeWizardId || !currentStep) {
        throw new Error('No active wizard or current step found');
      }

      // If there is a previous step in the current wizard, move to it
      if (currentStep > 0) {
        set((state) => ({
          ...state,
          currentStep: currentStep - 1,
          progress: calculateCurrentProgress(
            wizards,
            activeWizardId,
            currentStep - 1,
          ),
        }));

        return;
      }

      // If we are at the first step of the wizard, move to the previous wizard
      // TODO: should this ignore the seen status of previous wizards?
      const previousWizard = Object.entries(wizards)
        .map(([id, wizard]) => ({ id, ...wizard }))
        .sort((a, b) => Priorities[b.priority] - Priorities[a.priority])
        .reverse()
        .find((wizard) => wizard.id !== activeWizardId);

      if (previousWizard) {
        set((state) => ({
          ...state,
          activeWizardName: previousWizard.name,
          currentStep: previousWizard.steps.length - 1,
          progress: calculateCurrentProgress(
            wizards,
            previousWizard.id,
            previousWizard.steps.length - 1,
          ),
        }));

        return;
      }
    },
    hasNextStep() {
      const { wizards, activeWizardId, currentStep } = get();

      if (!activeWizardId || currentStep === null) {
        return false;
      }

      const activeWizard = wizards[activeWizardId]!;

      return currentStep < activeWizard.steps.length - 1;
    },
    hasPreviousStep() {
      const { wizards, activeWizardId, currentStep } = get();

      if (!activeWizardId || currentStep === null) {
        return false;
      }

      // Sort wizards by priority, and determine if the current wizard is the first
      const isFirstWizard = Object.entries(wizards)
        .map(([id, wizard]) => ({ id, ...wizard }))
        .sort((a, b) => Priorities[b.priority] - Priorities[a.priority])
        .reverse()
        .find((wizard) => wizard.id === activeWizardId);

      if (isFirstWizard) {
        return currentStep > 0;
      }

      return currentStep > 0;
    },
  }));
};

export type WizardStoreApi = ReturnType<typeof createWizardStore>;
