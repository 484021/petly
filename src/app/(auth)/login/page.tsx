import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Logo from "@/components/logo";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className=" flex flex-col items-center">
    
      
      <H1 className="text-center mb-5 mt-5">Log In</H1>
      <AuthForm type="logIn" />
      <p className="mt-6 text-sm text-zinc-500 mb-5">
        No Account yet?{" "}
        <Link href="/signup" className="font-medium">
          Sign Up
        </Link>
      </p>
      <Dialog >
        <DialogTrigger>
          <Button>Test Credentials</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Credentials</DialogTitle>
            <DialogDescription>User: example@gmail.com</DialogDescription>
            <DialogDescription>Password: example</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </main>
  );
}
