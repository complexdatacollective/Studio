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
import { createLocalStorageStore } from '../createLocalStorageStore';

const WizardContext = createContext<WizardStoreApi | undefined>(undefined);

// TODO: We probably want to scope this to the study/protocol
const storage = createLocalStorageStore<boolean>('wizard-store');

export type WizardLocalStore = ReturnType<typeof createLocalStorageStore>;

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<WizardStoreApi>();
  const { get: getItem, set: setItem, data } = storage();

  console.log('data', data);

  if (!storeRef.current) {
    storeRef.current = createWizardStore(getItem, setItem);
  }

  const { setActiveWizard } = useStore(storeRef.current);

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

  // Selector to get the first wizard that has not been seen
  const firstUnseenWizard = useStore(storeRef.current, ({ wizards }) =>
    wizards.find((wizard) => !getItem(wizard.name)),
  );

  // Set the active wizard based on the first wizard that has not been seen
  useEffect(() => {
    if (firstUnseenWizard) {
      setActiveWizard(firstUnseenWizard.name);
    }
  }, [firstUnseenWizard, setActiveWizard]);

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
