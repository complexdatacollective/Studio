'use client';

import * as React from 'react';
import { cn } from '~/lib/utils';
import Heading from '~/components/typography/Heading';
import Paragraph from '../typography/Paragraph';
import Surface from '../layout/Surface';
import Divider from '../layout/Divider';

export type CardProps = {
  title: string;
  description?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Card is a display component that uses surface-0 and is optionally clickable.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, description, children, ...props }, ref) => (
    <Surface
      as={props.onClick ? 'button' : 'div'}
      level={0}
      ref={ref}
      className={cn(
        'rounded border text-left text-sm',
        props.onClick &&
          'focusable cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground',
        className,
      )}
      spacing="sm"
      {...props}
    >
      <Heading variant="h4" className={cn(!description && !children && 'm-0')}>
        {title}
      </Heading>
      {description && (
        <>
          <Paragraph>{description}</Paragraph>
        </>
      )}
      {description && children && <Divider />}
      {children}
    </Surface>
  ),
);

Card.displayName = 'Card';
