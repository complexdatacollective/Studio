import React from 'react';
import { type Meta, type StoryFn } from '@storybook/react';
import ActionButton from '~/components/interview/ActionButton';
import {
  NodeColors,
  type NodeIcon,
  NodeIcons,
} from '~/schemas/protocol/codebook/entities';

export default {
  title: 'Interview/ActionButton',
  component: ActionButton,
  parameters: {
    forceTheme: 'interview',
    layout: 'centered',
  },
  argTypes: {
    iconName: {
      control: {
        type: 'select',
      },
      options: NodeIcons,
    },
    color: {
      control: {
        type: 'select',
      },
      options: NodeColors,
    },
    onClick: { action: 'clicked' }, // Action logger for click events
  },
  decorators: [
    (Story) => (
      <div className="bg-primary-background flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<{
  iconName: NodeIcon;
  className: string;
  onClick: () => void;
}> = (args) => <ActionButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconName: 'user-round',
  className: 'ng-node-seq-1', // Example default background class
};
