import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '~/lib/utils';

const buttonVariants = tv({
  base: cn(
    'inline-flex items-center justify-center rounded text-sm font-semibold transition-colors text-nowrap truncate tracking-wide',
    'hover:bg-opacity-90',
    'ring-offset-background ',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ',
    'disabled:pointer-events-none disabled:opacity-50',
  ),
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      primary: 'bg-primary text-primary-foreground',
      accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      success: 'bg-success text-success-foreground',
      outline:
        'bg-transparent hover:bg-primary hover:text-primary-foreground border border-[currentColor] text-[currentColor] hover:bg-opacity-100',
      ghost: 'hover:text-accent',
      tableHeader: 'hover:text-accent -ml-6 data-[state=open]:text-accent',
      link: 'underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-12 px-6',
      xs: 'h-8 px-3 text-xs',
      sm: 'h-10 px-4',
      lg: 'h-16 px-8',
      icon: 'h-12 w-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
  compoundVariants: [
    {
      variant: 'tableHeader',
      size: 'sm',
      className: '-ml-4',
    },
  ],
});

type ButtonProps = {
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
