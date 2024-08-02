'use client';

import { tv, type VariantProps } from 'tailwind-variants';
import React from 'react';
import { cn } from '~/lib/utils';
import { Slot } from '@radix-ui/react-slot';

export const headingVariants = tv({
  base: 'text-balance',
  variants: {
    variant: {
      'h1': 'scroll-m-20 text-4xl font-extrabold tracking-tight mb-4',
      'h2': 'scroll-m-20 text-3xl font-semibold tracking-tight mb-3',
      'h3': 'scroll-m-20 text-2xl font-semibold tracking-tight mb-2',
      'h4': 'scroll-m-20 text-xl font-semibold tracking-tight mb-2',
      'h4-all-caps':
        'scroll-m-20 text-sm font-extrabold tracking-widest uppercase',
      'label':
        'scroll-m-20 text-sm font-extrabold tracking-normal peer-disabled:opacity-70 peer-disabled:cursor-not-allowed',
    },
  },
});

type VariantPropType = VariantProps<typeof headingVariants>;

const variantElementMap: Record<
  NonNullable<VariantPropType['variant']>,
  string
> = {
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h4-all-caps': 'h4',
  'label': 'label',
};

type HeadingProps = {
  asChild?: boolean;
  as?: string;
} & React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>;

const Heading = React.forwardRef<HTMLElement, HeadingProps>(
  ({ className, variant, as, asChild, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : (as ?? (variant ? variantElementMap[variant] : undefined) ?? 'div');
    return (
      <Comp
        className={cn(headingVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Heading.displayName = 'Heading';

export default Heading;
