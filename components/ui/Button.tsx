import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '~/lib/utils';

const buttonVariants = tv({
  base: cn(
    'inline-flex items-center justify-center rounded text-sm font-semibold transition-colors text-nowrap truncate tracking-wide',
    'ring-offset-background',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ',
    'disabled:pointer-events-none disabled:saturate-50 disabled:cursor-not-allowed',
  ),
  variants: {
    variant: {
      default: 'hover:bg-opacity-80',
      outline: 'border', // Border
      text: '', // Text only, opaque fill on hover
    },
    color: {
      default: '',
      primary: '',
      destructive: '',
      accent: '',
      success: '',
    },
    size: {
      xs: 'h-8 px-3 text-xs',
      sm: 'h-10 px-4 text-base-sm',
      default: 'h-12 px-6 ',
      lg: 'h-16 px-8 text-base',
      icon: 'h-12 w-12',
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

      class:
        'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground',
    },
    {
      color: 'default',
      variant: 'outline',

      class:
        'border-secondary text-secondary-foreground hover:border-secondary hover:bg-secondary hover:text-secondary-foreground',
    },
    {
      color: 'default',
      variant: 'text',

      class: 'text-secondary-foreground hover:bg-secondary',
    },
    {
      color: 'primary',
      variant: 'default',
      class: 'bg-primary text-primary-foreground',
    },
    {
      color: 'primary',
      variant: 'outline',
      class:
        'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
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

type ButtonProps = {
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
  color?: VariantProps<typeof buttonVariants>['color'];
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
