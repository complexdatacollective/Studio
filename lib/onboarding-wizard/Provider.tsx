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
import Spotlight from '~/components/Spotlight';

const WizardContext = createContext<WizardStoreApi | undefined>(undefined);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<WizardStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createWizardStore();
  }

  const { wizards, setActiveWizard } = useStore(storeRef.current);

  // Selector to get the current step's target element ID (if any)
  const currentTargetElementId = useStore(
    storeRef.current,
    ({ currentStep, getActiveWizard }) => {
      const activeWizard = getActiveWizard();

      if (!activeWizard || currentStep === null) {
        return null;
      }

      return activeWizard.steps[currentStep]!.targetElementId;
    },
  );

  // Set the active wizard based on the first wizard that has not been seen
  useEffect(() => {
    const firstUnseenWizard = wizards.find(
      (wizard) => !localStorage.getItem(`wizard-${wizard.name}-seen`),
    );

    if (firstUnseenWizard) {
      setActiveWizard(firstUnseenWizard.name);
    }
  }, [wizards, setActiveWizard]);

  console.log('thing', currentTargetElementId);

  return (
    <WizardContext.Provider value={storeRef.current}>
      {currentTargetElementId && (
        <Spotlight targetElementId={currentTargetElementId} />
      )}
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
