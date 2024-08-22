'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { Step, useWizardContext } from '~/lib/onboardWizard/Provider';

const useWizardStore = () => {
  const { registerWizard, deregisterWizard, activeWizard, currentStep } =
    useWizardContext((store) => store);

  const nextStep = useCallback(() => {
    console.log('next');
  }, []);

  const previousStep = useCallback(() => {
    console.log('previous');
  }, []);

  return {
    activeWizard,
    currentStep,
    nextStep,
    previousStep,
    addWizardToStore: registerWizard,
    removeWizard: deregisterWizard,
  };
};

// Returns scroped state for a given wizard
const useRegisterWizard = ({
  name,
  steps,
  priority,
}: {
  name: string;
  steps: Step[];
  priority: number;
}) => {
  // Get global store
  const {
    activeWizard,
    currentStep,
    addWizardToStore,
    removeWizard,
    nextStep,
    previousStep,
  } = useWizardStore();

  // Only run on mount
  useEffect(() => {
    addWizardToStore({ name, steps, priority });

    return () => removeWizard(name);
  }, []);

  const isActive = useMemo(() => activeWizard === name, [activeWizard]);

  return {
    isActive,
    currentStep,
    nextStep,
    previousStep,
  };
};

// These should be in a helpers/utils file

const PopoverBackdrop = () => (
  <div className="absolute inset-0 z-10 backdrop-blur-sm backdrop-brightness-75" />
);

export default function OnboardWizard({
  steps,
  children,
  name,
  priority,
}: {
  steps: Step[];
  children: React.ReactNode;
  name: string;
  priority?: number;
}) {
  const { isActive, currentStep, nextStep, previousStep } = useRegisterWizard({
    name, // maybe this is where we generate something relative to the study/protocol?
    steps: [
      { content: <div>Step 1</div> },
      { content: <div>Step 2</div> },
      { content: <div>Step 3</div> },
    ],
    priority: 1,
  });

  // Abstract beacon logic into a hook, which returns:
  // type Beacon = {
  //   id: number;
  //   stepIndex: number; // Index of the step in the wizard
  //   position: { top: number; left: number };
  // };

  // Custom hook!
  // const beacons: Beacon[] = generateBeacons(steps);

  // activateWizard(0);

  return (
    <>
      {children}
      {isActive && (
        <>
          <PopoverBackdrop />
          {/* 

            Simplify the api here!

            New component, WizardStep should internally handle modal and 
            positioned variants. Total steps, and element position should be
            calculated inside the component, not passed as props.
          */}
          {/* <WizardStep step={currentStep} /> */}
          <div>
            {currentStep?.content}
            <button onClick={previousStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        </>
      )}
      {/* {showFlow &&
        beacons.map((beacon) =>
          // <Beacon
          //   key={beacon.id}
          //   position={beacon.position}
          //   onClick={() => activateWizard(beacon.stepIndex)}
          // />
          console.log('beacon'),
        )} */}
    </>
  );
}

// const WizardStep = ({ step }: { step: Step }) => {
//   const { targetElementId, content } = step;
//   const [position, setPosition] = useState();

//   useEffect(() => {
//     const updatePosition = () => {
//       if (!targetElementId) {
//         return;
//       }
//       const element = getTargetElement(targetElementId);
//       if (!element) {
//         return;
//       }
//       const newPosition = getElementPosition(element);
//       if (!newPosition) {
//         return;
//       }
//       setPosition(newPosition);
//     };

//     window.addEventListener('resize', updatePosition);
//     return () => window.removeEventListener('resize', updatePosition);
//   }, [targetElementId]);

//   return targetElementId ? (
//     <OnboardWizardPopover position={position} content={content} />
//   ) : (
//     <OnboardWizardModal content={content} />
//   );
// };
