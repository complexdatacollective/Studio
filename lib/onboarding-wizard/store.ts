import { type ReactNode } from 'react';
import { createStore } from 'zustand/vanilla';

export type Step = {
  // if targetElementId _not_ provided, render as a modal
  targetElementId?: string; // Should this be a ref, or just a string?
  content: Record<string, ReactNode>; // Todo: make the key signature any valid locale
};

export type Wizard = {
  name: string;
  steps: Step[];
  priority: number;
};

export type WizardState = {
  wizards: Wizard[];
  currentStep: number | null; // Only null when there's no active wizard.
  activeWizard: string | null;
  progress: {
    current: number;
    total: number;
  };
};

export type WizardActions = {
  registerWizard: (wizard: Wizard) => void;
  deregisterWizard: (name: Wizard['name']) => void;
  setActiveWizard: (name: Wizard['name'] | null) => void;
  nextStep: () => void;
  hasNextStep: () => boolean;
  previousStep: () => void;
  hasPreviousStep: () => boolean;
};

export type WizardStore = WizardState & WizardActions;

const defaultInitialState: WizardState = {
  wizards: [],
  currentStep: null,
  activeWizard: null,
  progress: {
    current: 0,
    total: 0,
  },
};

export const createWizardStore = (
  initState: WizardState = defaultInitialState,
) => {
  return createStore<WizardStore>()((set, get) => ({
    ...initState,
    registerWizard: (wizard) => {
      console.log('registering wizard', wizard);

      // Check wizard with this name does not already exist
      if (get().wizards.some((w) => w.name === wizard.name)) {
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
      console.log('deregistering wizard', name);
      set((state) => ({
        wizards: state.wizards.filter((wizard) => wizard.name !== name),
      }));
    },
    setActiveWizard: (name) => {
      set((state) => ({
        ...state,
        activeWizard: name,
        currentStep: 0,
        progress: {
          current: 1,
          total: name
            ? state.wizards.find((wizard) => wizard.name === name)!.steps.length
            : 0,
        },
      }));
    },
    nextStep() {
      console.log('next');
      const { wizards, activeWizard: activeWizardName, currentStep } = get();

      console.log({ wizards, activeWizardName, currentStep });

      if (!activeWizardName || currentStep === null) {
        console.log('No active wizard or current step found');
        return;
      }

      const activeWizardIndex = wizards.findIndex(
        (wizard) => wizard.name === activeWizardName,
      );

      if (activeWizardIndex === -1) {
        console.log('No active wizard found');
        return;
      }

      const activeWizard = wizards[activeWizardIndex]!;

      // If there is a next step in the current wizard, move to it
      if (currentStep < activeWizard.steps.length - 1) {
        console.log('moving to next step');
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

      console.log('moving to next wizard');
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
          activeWizard: nextWizard.name,
          currentStep: 0,
          progress: {
            current: 1,
            total: nextWizard.steps.length,
          },
        }));

        return;
      }

      // If there are no more wizards, reset the active wizard
      console.log('no more wizards');
      set((state) => ({
        ...state,
        activeWizard: null,
        currentStep: null,
        progress: {
          current: 0,
          total: 0,
        },
      }));
    },
    previousStep() {
      console.log('previous');
      const { wizards, activeWizard: activeWizardName, currentStep } = get();

      if (!activeWizardName || !currentStep) {
        return;
      }

      const activeWizardIndex = wizards.findIndex(
        (wizard) => wizard.name === activeWizardName,
      );

      if (activeWizardIndex === -1) {
        console.log('No active wizard found');
        return;
      }

      // If there is a previous step in the current wizard, move to it
      if (currentStep > 0) {
        console.log('moving to previous step');
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

      console.log('moving to previous wizard');
      // If we are at the first step of the wizard, move to the previous wizard
      // TODO: should this ignore the seen status of previous wizards?
      const previousWizard = wizards
        .slice(0, activeWizardIndex)
        .reverse()
        .find((wizard) => !localStorage.getItem(`wizard-${wizard.name}-seen`));

      if (previousWizard) {
        set((state) => ({
          ...state,
          activeWizard: previousWizard.name,
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
      const { wizards, activeWizard: activeWizardName, currentStep } = get();

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
      const { wizards, activeWizard: activeWizardName, currentStep } = get();

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
