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
import { AnimatePresence } from 'framer-motion';
import WizardStep from '~/components/onboard-wizard/WizardStep';

const WizardContext = createContext<WizardStoreApi | undefined>(undefined);

export const WIZARD_LOCAL_STORAGE_KEY = 'wizard-store';

// TODO: We probably want to scope this to the study/protocol
const createWizardLocalStorage = createLocalStorageStore<boolean>(
  WIZARD_LOCAL_STORAGE_KEY,
);

export type WizardLocalStore = ReturnType<typeof createLocalStorageStore>;

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<WizardStoreApi>();
  const { get: getItem, set: setItem } = createWizardLocalStorage();

  if (!storeRef.current) {
    storeRef.current = createWizardStore(getItem, setItem);
  }

  const activeStep = useStore(
    storeRef.current,
    ({ currentStep, getActiveWizard }) => {
      const activeWizard = getActiveWizard();

      if (!activeWizard || currentStep === null) {
        return null;
      }

      return activeWizard.steps[currentStep];
    },
  );

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

  const hasUnseenWizard = useStore(storeRef.current, ({ wizards }) =>
    Object.entries(wizards).some(([id]) => !getItem(id)),
  );

  const { setActiveWizard } = useStore(storeRef.current);

  // First run only: set the first unseen wizard as the active wizard
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasUnseenWizard && storeRef.current) {
        const firstUnseenWizardId = Object.entries(
          storeRef.current.getState().wizards,
        ).find(([id]) => !getItem(id))?.[0];
        if (firstUnseenWizardId) {
          setActiveWizard(firstUnseenWizardId);
        }
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [hasUnseenWizard, setActiveWizard, getItem]);

  return (
    <WizardContext.Provider value={storeRef.current}>
      <AnimatePresence>
        {activeStep && (
          <>
            <WizardStep step={activeStep} />
            {currentTargetElementId && (
              <Spotlight targetElementId={currentTargetElementId} />
            )}
          </>
        )}
      </AnimatePresence>
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
