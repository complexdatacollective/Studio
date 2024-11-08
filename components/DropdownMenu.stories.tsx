import type { Meta, StoryFn } from '@storybook/react';
import { ChevronDown } from 'lucide-react';
import DropdownMenu from './DropdownMenu';

const meta: Meta = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu.Root,
};

export default meta;

export const Default: StoryFn = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      Choose an Option <ChevronDown className="h-4 w-4" />
    </DropdownMenu.Trigger>
    <DropdownMenu.DropdownMenuContent>
      <DropdownMenu.Label>Input Control</DropdownMenu.Label>
      <DropdownMenu.RadioGroup>
        <DropdownMenu.Item
          textValue="checkboxGroup"
          onSelect={() => {
            alert('selected checkbox');
          }}
        >
          Checkbox Group
        </DropdownMenu.Item>
        <DropdownMenu.Item
          textValue="toggleButtonGroup"
          onSelect={() => {
            alert('selected toggle');
          }}
        >
          Toggle Button Group
        </DropdownMenu.Item>
      </DropdownMenu.RadioGroup>
    </DropdownMenu.DropdownMenuContent>
  </DropdownMenu.Root>
);
