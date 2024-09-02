'use client';

import { tv } from 'tailwind-variants';
import Heading from '../typography/Heading';
import { cn } from '~/lib/utils';
import { useId } from 'react';
import Surface, { SurfaceVariants } from './Surface';

const sectionClasses = 'rounded mb-10';

export default function Section({
  children,
  title,
  footer,
  className,
  level = 1,
}: {
  children: React.ReactNode;
  title: string;
  footer?: React.ReactNode;
  className?: string;
  level?: SurfaceVariants['level'];
}) {
  const getHeadingLevel = () => {
    switch (level) {
      case 0:
        return 'h2';
      case 1:
        return 'h2';
      case 2:
        return 'h3';
      case 3:
        return 'h4';
      case 4:
        return 'h4';
    }
  };

  const headingId = useId();

  return (
    <Surface
      as="section"
      className={cn(sectionClasses, className)}
      aria-labelledby={headingId}
      level={level}
    >
      <Heading id={headingId} variant={getHeadingLevel()}>
        {title}
      </Heading>
      {children}
      {footer && <footer>{footer}</footer>}
    </Surface>
  );
}
