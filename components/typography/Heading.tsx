'use client';

import { Slot } from '@radix-ui/react-slot';
import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '~/lib/utils';

export const headingVariants = tv({
  base: 'font-heading max-w-[55ch] text-balance font-bold [&:has(+.lead)]:mb-2',
  variants: {
    variant: {
      'h1': 'mb-6 scroll-m-20 text-2xl tracking-tight',
      'h2': 'mb-4 scroll-m-20 text-xl tracking-tight',
      'h3': 'mb-3 scroll-m-20 text-lg',
      'h4': 'mb-2 scroll-m-20 text-base font-[460] leading-6',
      'h4-all-caps': 'scroll-m-20 text-base uppercase tracking-widest',
      'label':
        'scroll-m-20 text-sm font-extrabold tracking-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    },
  },
  defaultVariants: {
    variant: 'h1',
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
