'use client';

import { tv, type VariantProps } from 'tailwind-variants';
import React from 'react';
import { cn } from '~/lib/utils';
import { Slot } from '@radix-ui/react-slot';

export const headingVariants = tv({
  base: 'text-balance font-heading font-bold [&:has(+.lead)]:mb-2 max-w-[55ch]',
  variants: {
    variant: {
      'h1': 'scroll-m-20 text-2xl tracking-tight mb-6',
      'h2': 'scroll-m-20 text-xl tracking-tight mb-4',
      'h3': 'scroll-m-20 text-lg mb-3',
      'h4': 'scroll-m-20 text-base mb-2 leading-6 font-[460]',
      'h4-all-caps': 'scroll-m-20 text-base tracking-widest uppercase',
      'label':
        'scroll-m-20 text-sm tracking-normal peer-disabled:opacity-70 peer-disabled:cursor-not-allowed font-extrabold',
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
