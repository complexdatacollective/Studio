// src/stories/Form.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Form, { type FormProps } from './Form';
import { Input } from './Input';
import { Button } from '../Button';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional class names to style the form',
    },
    children: {
      control: 'text',
      description: 'Form content (ReactNode)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    children: 'Form Content Here',
    className: '',
  },
  render: (args: FormProps) => (
    <Form {...args}>
      <Input name="text" type="text" placeholder="Enter text" />
      <Button type="submit">Submit</Button>
    </Form>
  ),
};

export const WithFooter: Story = {
  args: {
    children: (
      <>
        <Input name="text" type="text" placeholder="Enter text" />
        <Form.Footer
          primaryAction={<Button type="submit">Primary Action</Button>}
          secondaryAction={<Button>Secondary Action</Button>}
        />
      </>
    ),
    className: '',
  },
  render: (args: FormProps) => <Form {...args} />,
};
