import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { SUPPORTED_LOCALES } from './locales';

export const {
  Link: LocaleLink,
  redirect,
  usePathname,
  useRouter,
} = createSharedPathnamesNavigation({ locales: SUPPORTED_LOCALES });

type LinkProps = React.ComponentProps<typeof LocaleLink>;

export const Link = (props: LinkProps) => {
  return (
    <LocaleLink className="text-link no-underline hover:underline" {...props} />
  );
};
