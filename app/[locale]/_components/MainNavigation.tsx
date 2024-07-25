import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from '~/lib/localisation/navigation';
import { routes } from '~/lib/routes';
import SignOutBtn from './SignOutBtn';
import StudySwitcher from './StudySwitcher';

export default function MainNavigation() {
  const t = useTranslations('MainNavigation');
  return (
    <nav className="sticky top-0 flex w-full items-center justify-between gap-4 bg-slate-blue-dark p-2">
      <Link href={routes.home()} className="text-white">
        {t('home')}
      </Link>
      <StudySwitcher />
      <LanguageSwitcher />
      <SignOutBtn />
    </nav>
  );
}
