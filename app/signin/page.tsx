import Link from "next/link";
import { signin } from "~/actions/auth";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

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
          <form action={signin}>
            <div className="flex flex-col gap-3 p-2">
              <Label htmlFor="username">Username</Label>
              <Input name="username" id="username" placeholder="username..." />
            </div>
            <br />
            <div className="flex flex-col gap-3 p-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password..."
              />
            </div>
            <br />
            <Button>Continue</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
