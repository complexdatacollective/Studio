'use client';

import * as React from 'react';
import Divider from '~/components/layout/Divider';
import Surface from '~/components/layout/Surface';
import Heading from '~/components/typography/Heading';
import Paragraph from '~/components/typography/Paragraph';
import { cn } from '~/lib/utils';

export type CardProps = {
  title: string;
  description?: string;
} & React.ComponentPropsWithRef<'div'>;

/**
 * Card is a display component that uses surface-0 and is optionally clickable.
 */
export const Card = ({
  className,
  title,
  description,
  children,
  ref,
  ...props
}: CardProps) => (
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
);

Card.displayName = 'Card';
