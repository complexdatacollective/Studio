import { SUPPORTED_LOCALES } from '~/lib/localisation/locales';
import LanguageSwitcher from '~/app/_components/LanguageSwitcher';
import ThemeSwitcher from '~/app/_components/ThemeSwitcher';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="absolute top-2 flex gap-4 ltr:right-2 rtl:left-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      {children}
    </div>
  );
}
