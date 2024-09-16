'use client';

import { type Ref, type ElementType, type ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '~/lib/utils';
import { motion, MotionProps } from 'framer-motion';

export const surfaceVariants = tv({
  base: 'shadow',
  variants: {
    level: {
      0: 'bg-surface-0 text-surface-0-foreground [--background:var(--surface-0)] [--foreground:var(--surface-0-foreground)]',
      1: 'bg-surface-base text-surface-base-foreground [--background:var(--surface-base)] [--foreground:var(--surface-base-foreground)]',
      2: 'bg-[--2] [--2:color-mix(in_oklch,oklch(var(--background))_95%,oklch(var(--foreground)))]',
      3: 'bg-[--3] [--3:color-mix(in_oklch,var(--2)_95%,oklch(var(--foreground)))]',
      4: 'bg-[--4] [--4:color-mix(in_oklch,var(--3)_95%,oklch(var(--foreground)))]',
    },
    spacing: {
      none: '',
      xs: 'px-2 py-1 sm:px-2 sm:py-1 md:px-4 md:py-2 lg:px-4 lg:py-2',
      sm: 'px-4 py-2 sm:px-4 sm:py-2 md:px-6 md:py-4 lg:px-8 lg:py-6',
      md: 'px-8 py-6 md:px-10 md:py-8 lg:px-12 lg:py-8',
      lg: 'px-8 py-6 sm:px-10 sm:py-8 md:px-12 md:py-10 lg:px-16 lg:py-10',
      xl: 'px-10 py-8 sm:px-12 sm:py-10 md:px-16 md:py-12 lg:px-20 lg:py-12',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

export type SurfaceVariants = VariantProps<typeof surfaceVariants>;

const defaultElement = 'div';

type SurfaceProps<E extends ElementType> = {
  children: ReactNode;
  className?: string;
  as?: E;
  level: SurfaceVariants['level'];
  spacing?: SurfaceVariants['spacing'];
  ref?: Ref<HTMLDivElement>;
  id?: string;
  role?: string;
};

/**
 * The idea of surface is to ensure consistent styling of containers.
 */
export default function Surface<E extends ElementType = typeof defaultElement>({
  children,
  as,
  level,
  spacing,
  className,
  ref,
  id,
  role,
  ...props
}: SurfaceProps<E>) {
  const Component = as ?? defaultElement;

  return (
    <Component
      ref={ref}
      id={id}
      role={role}
      {...props}
      className={cn(surfaceVariants({ level, spacing }), className)}
    >
      {children}
    </Component>
  );
}

// @ts-expect-error incompatibility between framer-motion 12.x and new react types
export const MotionSurface = motion(Surface) as <
  E extends ElementType = typeof defaultElement,
>(
  props: MotionProps & SurfaceProps<E>,
) => JSX.Element;
