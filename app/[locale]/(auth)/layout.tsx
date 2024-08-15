import { SUPPORTED_LOCALES } from '~/lib/localisation/locales';
import LanguageSwitcher from '../_components/LanguageSwitcher';
import InjectThemeVariables from '~/lib/theme/InjectThemeVariables';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InjectThemeVariables theme="auth" />
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="absolute top-2 ltr:right-2 rtl:left-2">
          <LanguageSwitcher />
        </div>
        {children}
      </div>
    </>
  );
}
