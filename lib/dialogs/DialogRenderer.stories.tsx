import type { Meta, StoryObj } from '@storybook/react';
import { DialogRenderer } from './DialogRenderer';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Systems/Dialogs/DialogRenderer',
  component: DialogRenderer,
} satisfies Meta<typeof DialogRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
