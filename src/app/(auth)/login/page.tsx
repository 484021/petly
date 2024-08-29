import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Logo from "@/components/logo";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <div className="text-center">
        <H1 className="mb-2">Test Credentials</H1>
      </div>
      <p>User: example@gmail.com</p>
      <p>Password: example</p>
      <H1 className="text-center mb-5">Log In</H1>
      <AuthForm type="logIn" />
      <p className="mt-6 text-sm text-zinc-500">
        No Account yet?{" "}
        <Link href="/signup" className="font-medium">
          Sign Up
        </Link>
      </p>
    </main>
  );
}
