import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, ButtonProps, ButtonVariants, buttonVariants } from './Button';
import Heading from '../typography/Heading';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.size),
    },
    variant: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.variant),
    },
    color: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.color),
    },
    children: { control: 'text', defaultValue: 'Button' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn(), children: 'Button' },
} satisfies Meta<typeof Button>;

export default meta;

// Function to generate all combinations of props
const generateCombinations = () => {
  const combinations: {
    variant: Exclude<ButtonVariants['variant'], undefined>;
    color: Exclude<ButtonVariants['color'], undefined>;
    size: Exclude<ButtonVariants['size'], undefined>;
  }[] = [];

  const { color, variant, size } = buttonVariants.variants;
  const colors = Object.keys(color) as Exclude<
    ButtonVariants['color'],
    undefined
  >[];
  const variants = Object.keys(variant) as Exclude<
    ButtonVariants['variant'],
    undefined
  >[];
  const sizes = Object.keys(size) as Exclude<
    ButtonVariants['size'],
    undefined
  >[];

  colors.forEach((color) => {
    variants.forEach((variant) => {
      sizes.forEach((size) => {
        combinations.push({ variant, color, size });
      });
    });
  });

  return combinations;
};

const combinations = generateCombinations();

// Create a story for each color and variant group
const Template = (args: ButtonProps) => <Button {...args} />;

const stories: Record<
  string,
  Record<string, { name: string; args: ButtonProps }[]>
> = {};

combinations.forEach((combination) => {
  const { color, variant, size } = combination;

  // Group by color and then by variant
  if (!stories[color]) {
    stories[color] = {};
  }

  if (!stories[color][variant]) {
    stories[color][variant] = [];
  }

  stories[color][variant].push({
    name: `${variant}-${size}`,
    args: { variant, color, size, children: `${variant}-${size}` },
  });
});

export const ButtonStories = () => (
  <>
    {Object.keys(stories).map((color) => (
      <div key={color} className="flex flex-col gap-4">
        <Heading variant="h4">
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Heading>
        {Object.keys(stories[color]!).map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <div className="flex flex-1 items-center gap-2">
              {stories[color]![variant]!.map((story) => (
                <Template key={story.name} {...story.args} />
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </>
);
