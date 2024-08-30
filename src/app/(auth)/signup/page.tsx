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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";


export default function Page() {
  return (
    <main className="flex flex-col">
      
      <H1 className="text-center mb-5">Sign Up</H1>
      <AuthForm type="signUp"/>
      <p className="mt-6 text-sm text-zinc-500 mb-5">
        Already have an account?{" "}
        <Link href="/login" className="font-medium">
          Log In
        </Link>
      </p>
      <Dialog >
        <DialogTrigger>
          <Button>Test Credit Card</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Credit Card</DialogTitle>
            <DialogDescription>CC#: 4242 4242 4242 4242</DialogDescription>
            <DialogDescription>CVC: Any</DialogDescription>

          </DialogHeader>
        </DialogContent>
      </Dialog>

    </main>
  );
}
