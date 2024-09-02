import { type Ref, type ElementType, type ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '~/lib/utils';
import { motion } from 'framer-motion';

export const surfaceVariants = tv({
  base: '',
  variants: {
    level: {
      0: 'bg-surface-0 text-surface-0-foreground shadow-xl',
      1: 'bg-surface-1 text-surface-1-foreground shadow-lg',
      2: 'bg-surface-2 text-surface-2-foreground shadow-md',
      3: 'bg-surface-3 text-surface-3-foreground shadow-sm',
      4: 'bg-surface-4 text-surface-4-foreground shadow',
    },
    spacing: {
      none: '',
      xs: 'lg:py-2 lg:px-4 md:py-2 md:px-4 sm:py-1 sm:px-2 py-1 px-2',
      sm: 'lg:py-6 lg:px-8 md:py-4 md:px-6 sm:py-2 sm:px-4 py-2 px-4',
      md: 'lg:py-8 lg:px-12 md:py-8 md:px-10 py-6 px-8',
      lg: 'lg:py-10 lg:px-16 md:py-10 md:px-12 sm:py-8 sm:px-10 py-6 px-8',
      xl: 'lg:py-12 lg:px-20 md:py-12 md:px-16 sm:py-10 sm:px-12 py-8 px-10',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

export type SurfaceVariants = VariantProps<typeof surfaceVariants>;

const defaultElement = 'div';

type SurfaceProps<E extends ElementType = typeof defaultElement> = {
  children: ReactNode;
  className?: string;
  as?: E;
  level: SurfaceVariants['level'];
  spacing?: SurfaceVariants['spacing'];
  ref?: Ref<HTMLDivElement>;
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
  ...props
}: SurfaceProps<E>) {
  const Component = as ?? defaultElement;

  return (
    <Component
      ref={ref}
      {...props}
      className={cn(surfaceVariants({ level, spacing }), className)}
    >
      {children}
    </Component>
  );
}

export const MotionSurface = motion(Surface);
