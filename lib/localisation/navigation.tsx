import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { SUPPORTED_LOCALES } from './locales';
import { cn } from '../utils';
import { isInterviewRoute } from './utils';
import { useLocale } from 'next-intl';
import { fetchInterviewLocales } from '../middleware/IntlMiddleware';

const {
  Link: LocaleLink,
  redirect,
  usePathname,
  useRouter,
} = createSharedPathnamesNavigation({ locales: SUPPORTED_LOCALES });

export { redirect, usePathname, useRouter, LocaleLink };

type LinkProps = React.ComponentProps<typeof LocaleLink> & {
  protocolLanguages?: string[];
};

export const Link = ({ protocolLanguages, className, ...props }: LinkProps) => {
  const defaultLocale = useLocale();

  if (
    isInterviewRoute(props.href as string)
    // TODO: check if current path is an interview route. we want to use Link if both are.
  ) {
    const locale = props.locale ?? defaultLocale;

    const formatHref = () => {
      return protocolLanguages?.includes(locale)
        ? `/${locale}${String(props.href)}`
        : `${String(props.href)}`;
    };

    // use a tag instead of Link when navigating between backend and interview
    return (
      <a
        {...props}
        href={formatHref()}
        className={cn('text-link hover:underline', className)}
      >
        {props.children}
      </a>
    );
  }

  return (
    <LocaleLink
      {...props}
      className={cn('text-link hover:underline', className)}
    />
  );
};
