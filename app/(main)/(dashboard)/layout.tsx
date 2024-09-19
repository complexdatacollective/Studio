import { SearchIcon } from 'lucide-react';
import { Input } from '~/components/ui/form/Input';
import Image from 'next/image';
import StudySwitcher from './_components/StudySwitcher';
import LanguageSwitcher from '~/app/_components/LocaleSwitcher';
import SignOutBtn from './_components/SignOutBtn';
import { requirePageAuth } from '~/lib/auth';
import ResponsiveContainer from '~/components/layout/ResponsiveContainer';
import ThemeSwitcher from '~/app/_components/ThemeSwitcher';
import { BACKEND_LOCALES } from '~/lib/localisation/config';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePageAuth();

  return (
    <>
      <ResponsiveContainer
        as="header"
        className="relative my-5 flex min-h-full items-center justify-between"
        maxWidth="7xl"
      >
        <div className="absolute left-0 flex-shrink-0 lg:static">
          <span className="sr-only">Network Canvas Studio</span>
          <Image
            src="/images/studio.png"
            height={50}
            width={50}
            alt="Network Canvas Studio"
          />
        </div>
        <StudySwitcher />
        <ThemeSwitcher />
        <Input
          name="search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          className="w-full max-w-xs"
          leftAdornment={<SearchIcon className="h-5 w-5" />}
        />

        <LanguageSwitcher codes={BACKEND_LOCALES} />
        <div className="ml-4 flex items-center pr-0.5">
          <SignOutBtn />
        </div>
      </ResponsiveContainer>
      <ResponsiveContainer as="main" className="my-10">
        {children}
      </ResponsiveContainer>
      <footer className="p-4 text-center text-sm">
        &copy; 2024 Complex Data Collective.
      </footer>
    </>
  );
}
