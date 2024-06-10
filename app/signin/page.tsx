import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { validateRequest } from '~/lib/auth';
import SignInForm from './_components/SignInForm';

export default async function Page() {
  const { session, user } = await validateRequest();

  if (session && user) {
    // If the user is already signed in, redirect to the home page
    redirect('/');
  }

  return (
    <div className="grid h-[100vh] w-full items-center justify-center gap-1.5">
      <Card className="m-3 w-[28rem]">
        <CardHeader>
          <CardTitle>Sign in to Studio</CardTitle>
          <CardDescription>
            Don&apos;t have an account?{' '}
            <Link className="text-blue-400 underline" href={'/signup'}>
              Sign Up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
