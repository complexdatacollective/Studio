'use client';
import React from 'react';
import type { CardComponentProps } from 'onborda';
import { useOnborda } from 'onborda';
import { XIcon } from 'lucide-react';
import { Button } from '~/components/ui/Button';

const CustomCard: React.FC<CardComponentProps> = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}) => {
  const { closeOnborda } = useOnborda();

  return (
    // need to add pointer-events-auto to allow the user to interact with the card
    <div className="max-w-vw pointer-events-auto rounded-lg bg-accent p-4 text-white">
      <div className="flex w-full items-start justify-between">
        <div>
          <div className="text-lg font-bold">
            {step.icon} {step.title}
          </div>
          <div className="text-sm">
            {currentStep + 1} of {totalSteps}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => closeOnborda()}>
          <XIcon size={16} />
        </Button>
      </div>
      <div>{step.content}</div>
      <div>
        <div className="flex w-full justify-between space-x-4">
          {currentStep !== 0 && (
            <Button onClick={() => prevStep()}>Previous</Button>
          )}
          {currentStep + 1 !== totalSteps && (
            <Button onClick={() => nextStep()} className="ml-auto">
              Next
            </Button>
          )}
          {currentStep + 1 === totalSteps && (
            <Button onClick={() => closeOnborda()} className="ml-auto">
              🎉 Finish!
            </Button>
          )}
        </div>
      </div>
      <span className="text-accent">{arrow}</span>
    </div>
  );
};

export default CustomCard;
