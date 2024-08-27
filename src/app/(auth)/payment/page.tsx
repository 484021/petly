"use client";
import { createCheckoutSession, updateUserAccess } from "@/actions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center space-y-10 ">
      <H1>Petly access requires payment</H1>

      {searchParams.success && (
        <Button
          onClick={async () => {
            await update(true);
            router.push("/app/dashboard");
          }}
          disabled={status === "loading" || session?.user.hasAccess}
        >
          Access Petly
        </Button>
      )}

      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
        >
          Buy Lifetime access for $199
        </Button>
      )}

      {searchParams.success && (
        <p className="text-green-700">
          Payment successful! You now have lifetime access to Petly.
        </p>
      )}

      {searchParams.cancelled && (
        <p className="text-red-700">
          Payment unsucessful! You do not have access to Petly. You can try
          again.
        </p>
      )}
    </main>
  );
}
