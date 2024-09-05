// Card.stories.tsx

import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Card, type CardProps } from './Card';
import Paragraph from '../typography/Paragraph';

// Meta configuration for Storybook
const meta: Meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

// Template for the Card component
const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

// Default story for the Card component
export const Default = Template.bind({});
Default.args = {
  title: 'Card Title',
  description: 'This is a description for the card component.',
};

// Story without description
export const WithoutDescription = Template.bind({});
WithoutDescription.args = {
  title: 'Card Title',
};

// Story with custom content in children
export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  title: 'Card with Custom Content',
  description: 'This card has custom content passed as children.',
  children: <Paragraph>Here is some custom content inside the card!</Paragraph>,
};

// Story with a custom className
export const WithCustomClassName = Template.bind({});
WithCustomClassName.args = {
  title: 'Card with Custom Styles',
  description: 'This card has custom styles applied via className.',
  className: 'bg-primary text-primary-foreground',
};
