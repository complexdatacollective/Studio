import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '~/lib/utils';

const buttonVariants = tv({
  base: cn(
    'inline-flex items-center justify-center rounded text-sm font-semibold transition-colors text-nowrap truncate tracking-wide',
    'focusable',
    'disabled:pointer-events-none disabled:saturate-50 disabled:cursor-not-allowed',
  ),
  variants: {
    variant: {
      default: '',
      outline: 'border', // Border
      text: '', // Text only, opaque fill on hover
    },
    color: {
      default:
        '[--text:oklch(var(--foreground))] [--bg:color-mix(in_oklab,var(--text)_5%,oklch(var(--background)))]',
      primary: '',
      destructive: '',
      accent: '',
      success: '',
    },
    size: {
      xs: 'h-8 px-3 text-xs w-full sm:w-auto',
      sm: 'h-10 px-4 text-base-sm w-full sm:w-auto',
      default: 'h-12 px-6 w-full sm:w-auto',
      lg: 'h-16 px-8 text-base w-full sm:w-auto',
      icon: 'h-10 w-10 flex rounded-full shrink-0',
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
  type?: 'button' | 'submit' | 'reset';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      type = 'button',
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className }))}
        type={type}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
