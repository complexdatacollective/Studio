import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import SignInForm from "./_components/SignInForm";

export default async function Page() {
  return (
    <div className="grid w-full items-center h-[100vh] justify-center gap-1.5">
      <Card className="w-[28rem] m-3">
        <CardHeader>
          <CardTitle>Sign in to Studio</CardTitle>
          <CardDescription>
            Don&apos;t have an account?{" "}
            <Link className="text-blue-400 underline" href={"/signup"}>
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
