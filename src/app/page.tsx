import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <main className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Auth App
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px]">
          A secure authentication system with Email & Username login, Password Reset, and more. Built with Next.js, Prisma, and Supabase.
        </p>
        <div className="flex gap-4">
          <Link href="/login">
            <Button size="lg">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline">Create Account</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
