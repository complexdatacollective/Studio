import LanguageSwitcher from '~/app/_components/LocaleSwitcher';
import ThemeSwitcher from '~/app/_components/ThemeSwitcher';

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
