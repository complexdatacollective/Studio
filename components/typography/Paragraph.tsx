'use client';

import { tv, type VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { cn } from '~/lib/utils';

export const paragraphVariants = tv({
  base: 'text-pretty font-normal',
  variants: {
    variant: {
      default: '',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      inlineCode:
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'mb-3 text-lg opacity-70 font-semibold md:text-xl leading-6',
      mutedText: 'text-muted',
      smallText: 'text-sm',
    },
    margin: {
      default: '[&:not(:first-child)]:mt-4',
      none: 'mt-0',
    },
  },
  defaultVariants: {
    variant: 'default',
    margin: 'default',
  },
});

type ParagraphProps = {
  variant?: VariantProps<typeof paragraphVariants>['variant'];
  margin?: VariantProps<typeof paragraphVariants>['margin'];
  asChild?: boolean;
} & React.HTMLAttributes<HTMLParagraphElement>;

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, variant, margin, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(paragraphVariants({ variant, margin, className }))}
        {...props}
      />
    );
  },
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
