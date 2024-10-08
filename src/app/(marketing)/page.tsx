import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10 ">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview of Petly"
        width={519}
        height={472}
      />
      <div className="flex flex-col text-center items-center mb-10">
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold ">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px] text-left px-3">
          Use <span className="font-extrabold">Petly</span> to easily keep track of pets under your care. Get lifetime
          access for $199
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild><Link href="/signup">Get started</Link></Button>
          <Button asChild variant="secondary"><Link href="/login">Log in</Link></Button>
        </div>
      </div>
    </main>
  );
}
