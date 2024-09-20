/* eslint-disable no-restricted-imports */
import NextLink from 'next/link';
import { type LinkProps } from 'next/link';
import { cn } from '~/lib/utils';

export default function Link({ className, ...props }: LinkProps) {
  return (
    <NextLink
      {...props}
      className={cn('text-link hover:underline', className)}
    />
  );
}
