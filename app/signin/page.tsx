import Link from "next/link";
import { signin } from "~/actions/auth";

export default async function Page() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1>Sign in</h1>
      <form action={signin}>
        <div className="flex flex-col gap-3 border border-red-300 p-2">
          <label htmlFor="username">Username</label>
          <input className="text-slate-600" name="username" id="username" />
        </div>
        <br />
        <div className="flex flex-col gap-3 border border-red-300 p-2">
          <label htmlFor="password">Password</label>
          <input
            className="text-slate-600"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <br />
        <button className="p-2 border border-emerald-200">Continue</button>
      </form>

      <div>
        <h2>
          Do not have an account{" "}
          <Link className="text-blue-400 underline" href={"/signup"}>
            Sign Up
          </Link>
        </h2>
      </div>
    </div>
  );
}
