import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { SUPPORTED_LOCALES } from './locales';
import { cn } from '../utils';

const {
  Link: LocaleLink,
  redirect,
  usePathname,
  useRouter,
} = createSharedPathnamesNavigation({ locales: SUPPORTED_LOCALES });

export { redirect, usePathname, useRouter, LocaleLink };

type LinkProps = React.ComponentProps<typeof LocaleLink>;

export const Link = ({ className, ...props }: LinkProps) => {
  return (
    <LocaleLink
      {...props}
      className={cn('text-link hover:underline', className)}
    />
  );
};
