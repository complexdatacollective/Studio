import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import SignUpForm from "./_components/SignUpForm";
import { validateRequest } from "~/utils/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session, user } = await validateRequest();

  if (session && user) {
    // If the user is already signed in, redirect to the home page
    redirect("/");
  }

  return (
    <div className="grid w-full items-center h-[100vh] justify-center gap-1.5">
      <Card className="w-[28rem] m-3">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link className="text-blue-400 underline" href={"/signin"}>
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