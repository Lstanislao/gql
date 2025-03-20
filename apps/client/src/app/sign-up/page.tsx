import { SignUpForm } from '@/components/auth/SignUpForm';
import { Footer } from '@/components/common/Footer';
import { NavBar } from '@/components/common/Navbar';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <NavBar />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4 py-12">
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-muted-foreground">
                Enter your information to create an account
              </p>
            </div>
            <SignUpForm />
            <div className="text-center text-sm text-muted-foreground">
              Do you have an account?{' '}
              <Link href="/sign-in" className="underline" prefetch={false}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
