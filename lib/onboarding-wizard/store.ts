import { createStore } from 'zustand';
import type { LocalisedString, LocalisedRecord } from '~/schemas/shared';
import { type LocalStorageState } from '~/lib/createLocalStorageStore';

const Priorities = {
  ShowFirst: Infinity,
  UI: 100,
  Navigation: 50,
  Task: 10,
  ShowLast: -Infinity,
} as const;

type Priority = keyof typeof Priorities;

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

type WizardState = {
  wizards: Record<Wizard['id'], Omit<Wizard, 'id'>>;
  currentStep: number; // Only null when there's no active wizard.
  activeWizardId: Wizard['id'] | null;
  progress: {
    current: number;
    total: number;
  };
};

type WizardActions = {
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
      set((state) => ({
        ...state,
        wizards: {
          ...state.wizards,
          [wizard.id]: wizard,
        },
      }));
    },
    deregisterWizard: (id) => {
      set((state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _, ...wizards } = state.wizards;
        return {
          ...state,
          wizards,
        };
      });
    },
    setActiveWizard: (id) => {
      if (!id) {
        set((state) => ({
          ...state,
          activeWizardId: null,
          currentStep: 0,
          progress: {
            current: 0,
            total: 0,
          },
        }));

        return;
      }

      const wizards = get().wizards;

      if (!Object.keys(wizards).includes(id)) {
        throw new Error(`Wizard with id ${id} not found`);
      }

      set((state) => ({
        ...state,
        activeWizardId: id,
        currentStep: 0,
        progress: {
          current: 1,
          total: wizards[id]!.steps.length,
        },
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
          activeWizardId: nextWizard.id,
          currentStep: 0,
          progress: {
            current: 1,
            total: nextWizard.steps.length,
          },
        }));

        return;
      }

      // If there are no more wizards, reset the active wizard
      const { setActiveWizard } = get();
      setActiveWizard(null);
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
          progress: {
            ...state.progress,
            current: state.progress.current - 1,
          },
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
          progress: {
            current: previousWizard.steps.length,
            total: previousWizard.steps.length,
          },
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
