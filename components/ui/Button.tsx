import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '~/lib/utils';

const buttonVariants = tv({
  base: cn(
    'font-semibold inline-flex items-center justify-center truncate text-nowrap rounded text-sm tracking-wide transition-colors',
    'focusable',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:saturate-50',
  ),
  variants: {
    variant: {
      default: '',
      outline: 'border', // Border
      text: '', // Text only, opaque fill on hover
    },
    color: {
      default: cn(
        // bg: mix of 5% of text color and background color
        '[--bg:color-mix(in_oklab,var(--text)_8%,oklch(var(--background)))]',
        // text: use the foreground color
        '[--text:oklch(var(--foreground))]',
      ),
      primary: '',
      destructive: '',
      accent: '',
      success: '',
    },
    size: {
      xs: 'h-8 w-full px-3 text-xs sm:w-auto',
      sm: 'h-10 w-full px-4 text-base-sm sm:w-auto',
      default: 'h-12 w-full px-6 sm:w-auto',
      lg: 'h-16 w-full px-8 text-base sm:w-auto',
      icon: 'flex h-10 w-10 shrink-0 rounded-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    color: 'default',
    size: 'default',
  },
  compoundVariants: [
    {
      color: 'default',
      variant: 'default',
      className:
        'bg-[--bg] text-[--text] hover:bg-[color-mix(in_oklch,var(--bg)_95%,var(--text))]',
    },
    {
      color: 'default',
      variant: 'outline',

      class:
        'border-[--bg] text-[--text] hover:border-transparent hover:bg-[--bg] hover:text-[--text]',
    },
    {
      color: 'default',
      variant: 'text',

      class: 'text-[--text] hover:bg-[--bg] hover:bg-opacity-50',
    },
    {
      color: 'primary',
      variant: 'default',
      class: 'bg-primary text-primary-foreground',
    },
    {
      color: 'primary',
      variant: 'outline',
      class: cn(
        'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
      ),
    },
    {
      color: 'primary',
      variant: 'text',
      class: 'text-primary hover:bg-primary/10',
    },
    {
      color: 'destructive',
      variant: 'default',
      class: 'bg-destructive text-destructive-foreground',
    },
    {
      color: 'destructive',
      variant: 'outline',
      class:
        'border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground',
    },
    {
      color: 'destructive',
      variant: 'text',
      class: 'text-destructive hover:bg-destructive/10',
    },
    {
      color: 'accent',
      variant: 'default',
      class: 'bg-accent text-accent-foreground',
    },
    {
      color: 'accent',
      variant: 'outline',
      class:
        'border-accent text-accent hover:bg-accent hover:text-accent-foreground',
    },
    {
      color: 'accent',
      variant: 'text',
      class: 'text-accent hover:bg-accent/10',
    },
    {
      color: 'success',
      variant: 'default',
      class: 'bg-success text-success-foreground',
    },
    {
      color: 'success',
      variant: 'outline',
      class:
        'border-success text-success hover:bg-success hover:text-success-foreground',
    },
    {
      color: 'success',
      variant: 'text',
      class: 'text-success hover:bg-success/10',
    },
  ],
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  color?: ButtonVariants['color'];
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  className,
  variant,
  size,
  color,
  asChild = false,
  ref,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, color, className }))}
      ref={ref}
      {...props}
    />
  );
};

export { Button, buttonVariants };
