import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Logo from "@/components/logo";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5">Sign Up</H1>
      <AuthForm type="signUp"/>
      <p className="mt-6 text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium">
          Log In
        </Link>
      </p>
    </main>
  );
}
