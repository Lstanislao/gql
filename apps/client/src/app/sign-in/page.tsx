import { SignInForm } from '@/components/auth/SignInForm';
import { Footer } from '@/components/common/Footer';
import { NavBar } from '@/components/common/Navbar';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <NavBar />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4 py-12">
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <p className="text-muted-foreground">
                Enter your credentials to access your account.
              </p>
            </div>
            <SignInForm />
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/sign-up" className="underline" prefetch={false}>
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
