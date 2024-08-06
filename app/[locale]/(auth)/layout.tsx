import LanguageSwitcher from '../_components/LanguageSwitcher';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="absolute top-2 ltr:right-2 rtl:left-2">
        <LanguageSwitcher />
      </div>
      {children}
    </div>
  );
}
