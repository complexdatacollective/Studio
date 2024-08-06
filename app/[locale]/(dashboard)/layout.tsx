import { SearchIcon } from 'lucide-react';
import { Input } from '~/components/ui/form/Input';
import Image from 'next/image';
import StudySwitcher from './_components/StudySwitcher';
import LanguageSwitcher from '../_components/LanguageSwitcher';
import SignOutBtn from './_components/SignOutBtn';
import StudioLogo from '~/public/studio.png';
import { requirePageAuth } from '~/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePageAuth();

  return (
    <>
      <div className="min-h-full">
        <header>
          <div className="lpx-8 mx-auto max-w-7xl px-4">
            <div className="relative flex items-center justify-between py-5">
              <div className="absolute left-0 flex-shrink-0 lg:static">
                <span className="sr-only">Network Canvas Studio</span>
                <Image
                  src={StudioLogo}
                  height={75}
                  width={75}
                  alt="Network Canvas Studio"
                />
              </div>
              <StudySwitcher />

              <Input
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="w-full max-w-xs"
                leftAdornment={<SearchIcon className="h-5 w-5" />}
              />

              <LanguageSwitcher />
              <div className="ml-4 flex items-center pr-0.5">
                <SignOutBtn />
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 sm:px-6 lg:px-8">{children}</main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t py-8 text-center text-sm">
              &copy; 2024 Complex Data Collective.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
