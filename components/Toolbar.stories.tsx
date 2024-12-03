import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { Button } from './Button';
import Popover from './Popover';
import Toolbar from './Toolbar';

const meta: Meta = {
  title: 'UI/Toolbar',
  component: Popover,
};

export default meta;

const ToolbarComponent = () => {
  const [selectedToggle, setSelectedToggle] = useState<string | null>(null);

  return (
    <Toolbar.Root>
      <Toolbar.Button onClick={() => alert('Button 1 clicked!')}>
        Button
      </Toolbar.Button>
      <Toolbar.ToggleGroup
        type="single"
        onValueChange={(value) => {
          setSelectedToggle(value ?? null);
        }}
      >
        <Toolbar.ToggleItem
          value="toggle1"
          active={selectedToggle === 'toggle1'}
        >
          Toggle 1
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          value="toggle2"
          active={selectedToggle === 'toggle2'}
        >
          Toggle 2
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export const Default: StoryFn = () => (
  <Popover content={<ToolbarComponent />}>
    <Button>Open Toolbar</Button>
  </Popover>
);
