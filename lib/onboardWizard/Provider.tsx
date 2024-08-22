import { createContext, type ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

export type Step = {
  targetElementDataId?: string;
  content: ReactNode;
};

export type Wizard = {
  name: string;
  steps: Step[];
  priority: number;
  isActive: boolean;
};

type WizardState = {
  wizards: Wizard[];
  currentStep: Step | null; // Only null when there's no active wizard.
  activeWizard: string | null;
};

type WizardActions = {
  registerWizard: (wizard: Omit<Wizard, 'currentStep' | 'isActive'>) => void;
  deregisterWizard: (name: Wizard['name']) => void;
  // setActiveWizard: (name: string) => void;
  // nextStep: () => void;
  // previousStep: () => void;
  // finishWizard: (name: string) => void;
};

type WizardStore = WizardState & WizardActions;

const defaultInitialState: WizardState = {
  wizards: [],
  currentStep: null,
  activeWizard: null,
};

const createWizardStore = (initState: WizardState = defaultInitialState) => {
  return createStore<WizardStore>()((set) => ({
    ...initState,
    registerWizard: (wizard) => {
      console.log('registering wizard', wizard);
      set((state) => ({
        wizards: [
          ...state.wizards,
          { ...wizard, currentStep: 0, isActive: false },
        ].sort((a, b) => a.priority - b.priority),
      }));
    },
    deregisterWizard: (name) => {
      console.log('deregistering wizard', name);
      set((state) => ({
        wizards: state.wizards.filter((wizard) => wizard.name !== name),
      }));
    },
  }));
};

export type WizardStoreApi = ReturnType<typeof createWizardStore>;

const WizardContext = createContext<WizardStoreApi | undefined>(undefined);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<WizardStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createWizardStore();
  }

  return (
    <WizardContext.Provider value={storeRef.current}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = <T,>(
  selector: (store: WizardStore) => T,
): T => {
  const wizardStoreContext = useContext(WizardContext);
  if (!wizardStoreContext) {
    throw new Error(
      'useUserActionsContext must be used within a UserActionsProvider',
    );
  }

  return useStore(wizardStoreContext, selector);
};
