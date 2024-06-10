import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import SignUpForm from './_components/SignUpForm';
import { validateRequest } from '~/lib/auth';
import { redirect } from 'next/navigation';
import { routes } from '~/lib/routes';

export default async function Page() {
  const { session, user } = await validateRequest();

  if (session && user) {
    // If the user is already signed in, redirect to the home page
    redirect(routes.home());
  }

  return (
    <div className="grid h-[100vh] w-full items-center justify-center gap-1.5">
      <Card className="m-3 w-[28rem]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Already have an account?{' '}
            <Link className="text-blue-400 underline" href={routes.signIn()}>
              Sign In
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
