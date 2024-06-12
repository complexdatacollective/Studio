import CssVariableSlider from '~/components/CSSVariableSlider';
import Heading from '~/components/typography/Heading';
import { Button } from '~/components/ui/Button';

export default function Page() {
  return (
    <div>
      <Heading variant="h1">Theme Test</Heading>
      <div>
        <Heading variant="h2">Parameters</Heading>
        <CssVariableSlider variableName="--theme-hue" min={0} max={360} />
        <CssVariableSlider
          variableName="--theme-hue-offset"
          min={0}
          max={360}
        />
      </div>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}
