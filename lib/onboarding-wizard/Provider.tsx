'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useStore } from 'zustand';
import {
  createWizardStore,
  type WizardStore,
  type WizardStoreApi,
} from './store';

const WizardContext = createContext<WizardStoreApi | undefined>(undefined);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<WizardStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createWizardStore();
  }

  const { wizards, setActiveWizard } = useStore(storeRef.current);

  // Set the active wizard based on the first wizard that has not been seen
  useEffect(() => {
    console.log('checking for active wizard');
    const activeWizard = wizards.find(
      (wizard) => !localStorage.getItem(`wizard-${wizard.name}-seen`),
    );

    if (activeWizard) {
      console.log('found active wizard', activeWizard);
      setActiveWizard(activeWizard.name);
    }
  }, [wizards, setActiveWizard]);

  return (
    <WizardContext.Provider value={storeRef.current}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = <T extends WizardStore>(
  selector?: (store: WizardStore) => T,
) => {
  const wizardStoreContext = useContext(WizardContext);
  if (!wizardStoreContext) {
    throw new Error(
      'useUserActionsContext must be used within a UserActionsProvider',
    );
  }

  const selectorWithDefault = selector ?? ((store) => store);

  return useStore(wizardStoreContext, selectorWithDefault);
};
