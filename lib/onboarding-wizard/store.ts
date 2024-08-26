import { createStore } from 'zustand/vanilla';
import { type LocalisedRecord } from '../schemas/shared';

export type Step = {
  // if targetElementId _not_ provided, render as a modal
  targetElementId?: string;
  content: LocalisedRecord; // Todo: make the key signature any valid locale
};

export type Wizard = {
  name: string;
  steps: Step[];
  priority: number;
};

export type WizardState = {
  wizards: Wizard[];
  currentStep: number | null; // Only null when there's no active wizard.
  activeWizardName: string | null;
  progress: {
    current: number;
    total: number;
  };
  showBeacons: boolean;
};

export type WizardActions = {
  registerWizard: (wizard: Wizard) => void;
  deregisterWizard: (name: Wizard['name']) => void;
  setActiveWizard: (name: Wizard['name'] | null, step?: number) => void;
  nextStep: () => void;
  hasNextStep: () => boolean;
  previousStep: () => void;
  hasPreviousStep: () => boolean;
  setShowBeacons: (show: boolean) => void;
  getActiveWizard: () => Wizard | null;
};

export type WizardStore = WizardState & WizardActions;

const defaultInitialState: WizardState = {
  wizards: [],
  currentStep: null,
  activeWizardName: null,
  progress: {
    current: 0,
    total: 0,
  },
  showBeacons: false,
};

export const createWizardStore = (
  initState: WizardState = defaultInitialState,
) => {
  return createStore<WizardStore>()((set, get) => ({
    ...initState,
    getActiveWizard: () => {
      const { activeWizardName, wizards } = get();

      return activeWizardName
        ? (wizards.find((wizard) => wizard.name === activeWizardName) ?? null)
        : null;
    },
    setShowBeacons: (show) => {
      set((state) => ({
        ...state,
        showBeacons: show,
      }));
    },
    registerWizard: (wizard) => {
      // Check wizard with this name does not already exist
      if (get().wizards.some((w) => w.name === wizard.name)) {
        // eslint-disable-next-line no-console
        console.error(`Wizard with name ${wizard.name} already exists`);
        return;
      }

      function compareFn(a: Wizard, b: Wizard) {
        if (a.priority < b.priority) {
          return 1;
        }

        if (a.priority > b.priority) {
          return -1;
        }

        return 0;
      }

      set((state) => ({
        wizards: [...state.wizards, wizard].sort(compareFn),
      }));
    },
    deregisterWizard: (name) => {
      set((state) => ({
        wizards: state.wizards.filter((wizard) => wizard.name !== name),
      }));
    },
    setActiveWizard: (name, step) => {
      console.log('setactive', name, step);

      set((state) => ({
        ...state,
        activeWizardName: name,
        currentStep: step ?? 0,
        showBeacons: false,
        progress: {
          current: step ? step + 1 : 1,
          total: name
            ? state.wizards.find((wizard) => wizard.name === name)!.steps.length
            : 0,
        },
      }));
    },
    nextStep() {
      const {
        wizards,
        activeWizardName: activeWizardName,
        currentStep,
      } = get();

      if (!activeWizardName || currentStep === null) {
        // eslint-disable-next-line no-console
        throw new Error('No active wizard or current step found');
      }

      const activeWizardIndex = wizards.findIndex(
        (wizard) => wizard.name === activeWizardName,
      );

      if (activeWizardIndex === -1) {
        throw new Error('No active wizard found');
      }

      const activeWizard = wizards[activeWizardIndex]!;

      // If there is a next step in the current wizard, move to it
      if (currentStep < activeWizard.steps.length - 1) {
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
      localStorage.setItem(`wizard-${activeWizardName}-seen`, 'true');

      const nextWizard = wizards.find((wizard, index) => {
        return (
          index > activeWizardIndex &&
          !localStorage.getItem(`wizard-${wizard.name}-seen`)
        );
      });

      if (nextWizard) {
        set((state) => ({
          ...state,
          activeWizardName: nextWizard.name,
          currentStep: 0,
          progress: {
            current: 1,
            total: nextWizard.steps.length,
          },
        }));

        return;
      }

      // If there are no more wizards, reset the active wizard
      set((state) => ({
        ...state,
        activeWizardName: null,
        currentStep: null,
        progress: {
          current: 0,
          total: 0,
        },
      }));
    },
    previousStep() {
      const {
        wizards,
        activeWizardName: activeWizardName,
        currentStep,
      } = get();

      if (!activeWizardName || !currentStep) {
        throw new Error('No active wizard or current step found');
      }

      const activeWizardIndex = wizards.findIndex(
        (wizard) => wizard.name === activeWizardName,
      );

      if (activeWizardIndex === -1) {
        throw new Error('No active wizard found');
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
      const previousWizard = wizards
        .slice(0, activeWizardIndex)
        .reverse()
        .find((wizard) => !localStorage.getItem(`wizard-${wizard.name}-seen`));

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
      const {
        wizards,
        activeWizardName: activeWizardName,
        currentStep,
      } = get();

      if (!activeWizardName || currentStep === null) {
        return false;
      }

      const activeWizardIndex = wizards.findIndex(
        (wizard) => wizard.name === activeWizardName,
      );

      if (activeWizardIndex === -1) {
        return false;
      }

      const activeWizard = wizards[activeWizardIndex]!;

      return currentStep < activeWizard.steps.length - 1;
    },
    hasPreviousStep() {
      const {
        wizards,
        activeWizardName: activeWizardName,
        currentStep,
      } = get();

      if (!activeWizardName || currentStep === null) {
        return false;
      }

      const activeWizardIndex = wizards.findIndex(
        (wizard) => wizard.name === activeWizardName,
      );

      if (activeWizardIndex === -1) {
        return false;
      }

      return currentStep > 0;
    },
  }));
};

export type WizardStoreApi = ReturnType<typeof createWizardStore>;
