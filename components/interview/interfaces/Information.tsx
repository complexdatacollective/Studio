import OnboardWizard from '~/components/OnboardWizard/OnboardWizard';
import Heading from '~/components/typography/Heading';

const demoSteps = [
  {
    targetElementId: 'data-wizard-task-step-1',
    content: {
      en: 'This is the information section. Click the next button to continue.',
      es: '',
      ar: '',
    },
  },
];

export default function Information() {
  return (
    <OnboardWizard steps={demoSteps} name="task" priority={2}>
      <div
        className="flex flex-col overflow-hidden px-4 py-2"
        data-id="data-wizard-task-step-1"
      >
        <Heading variant="h1">Information Interface</Heading>
      </div>
    </OnboardWizard>
  );
}
