'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import { hash } from 'ohash';
import type { Step } from './types';

type OnboardWizardState = {
  currentStep: Step | null;
  isActive: boolean;
  showFlow: boolean;
  progress: number;
};

type OnboardWizardAction =
  | { type: 'ACTIVATE_WIZARD'; step: Step | undefined }
  | { type: 'NEXT_STEP'; steps: Step[] }
  | { type: 'PREV_STEP'; steps: Step[] }
  | { type: 'COMPLETE_WIZARD' }
  | { type: 'SHOW_FLOW' }
  | { type: 'HIDE_FLOW' };

type OnboardWizardContextProps = {
  state: OnboardWizardState;
  dispatch: React.Dispatch<OnboardWizardAction>;
};

const initialState: OnboardWizardState = {
  currentStep: null,
  isActive: false,
  showFlow: false,
  progress: 0,
};

const onboardWizardReducer = (
  state: OnboardWizardState,
  action: OnboardWizardAction,
): OnboardWizardState => {
  switch (action.type) {
    case 'ACTIVATE_WIZARD': {
      if (!action.step) {
        return { ...state, isActive: false };
      }
      return { ...state, currentStep: action.step, isActive: true };
    }
    case 'NEXT_STEP': {
      if (state.currentStep) {
        const currentIndex = action.steps.indexOf(state.currentStep);
        const nextStep = action.steps[currentIndex + 1] ?? null;
        return {
          ...state,
          currentStep: nextStep,
          progress: nextStep
            ? (currentIndex + 2) / action.steps.length
            : state.progress,
        };
      }
      // if there is no next step, complete the wizard
      return state;
    }
    case 'PREV_STEP': {
      if (state.currentStep) {
        const currentIndex = action.steps.indexOf(state.currentStep);
        const prevStep = action.steps[currentIndex - 1] ?? null;
        return {
          ...state,
          currentStep: prevStep,
          progress: prevStep
            ? currentIndex / action.steps.length
            : state.progress,
        };
      }
      // if there is no prev step, do nothing
      return state;
    }

    case 'COMPLETE_WIZARD':
      return { ...state, isActive: false, progress: 1, currentStep: null };
    case 'SHOW_FLOW':
      return { ...state, showFlow: true };
    case 'HIDE_FLOW':
      return { ...state, showFlow: false };
    default:
      return state;
  }
};

const OnboardWizardContext = createContext<
  OnboardWizardContextProps | undefined
>(undefined);

const queueWizard = (name: string, hashedSteps: string, priority?: number) => {
  const key = `ONBOARD_WIZARD_${hashedSteps}`;
  localStorage.setItem(key, JSON.stringify({ name, priority }));
};

export const OnboardWizardProvider = ({
  children,
  steps,
  name,
  priority,
}: {
  children: ReactNode;
  steps: Step[];
  name: string;
  priority?: number;
}) => {
  const [state, dispatch] = useReducer(onboardWizardReducer, initialState);

  const hashedSteps = hash(steps); // memoize this

  useEffect(() => {
    const key = `ONBOARD_WIZARD_${hashedSteps}`;
    const storedSteps = localStorage.getItem(key);
    const isFirstRun = !storedSteps;

    if (isFirstRun) {
      queueWizard(name, hashedSteps, priority);
    }
  }, [hashedSteps, name, priority]);

  const value = { state, dispatch };

  return (
    <OnboardWizardContext.Provider value={value}>
      {children}
    </OnboardWizardContext.Provider>
  );
};

export const useOnboardWizard = () => {
  const context = useContext(OnboardWizardContext);
  if (!context) {
    throw new Error(
      'useOnboardWizard must be used within an OnboardWizardProvider',
    );
  }
  return context;
};

export const useRegisterWizard = ({
  name,
  steps,
  priority,
}: {
  name: string;
  steps: Step[];
  priority?: number;
}) => {
  const { state, dispatch } = useOnboardWizard();

  useEffect(() => {
    const hashedSteps = hash(steps);
    const key = `ONBOARD_WIZARD_${hashedSteps}`;
    const storedSteps = localStorage.getItem(key);
    const isFirstRun = !storedSteps;

    if (isFirstRun) {
      queueWizard(name, hashedSteps, priority);
    }
  }, [name, steps, priority]);

  const activateWizard = (stepIndex: number) => {
    dispatch({ type: 'ACTIVATE_WIZARD', step: steps[stepIndex] });
  };

  return {
    currentStep: state.currentStep,
    isActive: state.isActive,
    showFlow: state.showFlow,
    activateWizard,
    progress: state.progress,
  };
};
