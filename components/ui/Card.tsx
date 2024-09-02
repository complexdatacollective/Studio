'use client';

import * as React from 'react';
import { cn } from '~/lib/utils';
import Heading from '~/components/typography/Heading';
import Paragraph from '../typography/Paragraph';
import Surface from '../layout/Surface';
import Divider from '../layout/Divider';
import { Link } from '~/lib/localisation/navigation';

const cardClasses = 'rounded border';

type CardProps = {
  title: string;
  description?: string;
  href: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, href, description, children, ...props }, ref) => (
    <Link aria-label={title} href={href}>
      <Surface
        level={0}
        ref={ref}
        className={cn(cardClasses, className)}
        {...props}
      >
        <Heading variant="h3" className="p-6">
          {title}
        </Heading>
        {description && (
          <>
            <Paragraph>{description}</Paragraph>
            <Divider />
          </>
        )}
        {children}
      </Surface>
    </Link>
  ),
);

Card.displayName = 'Card';
