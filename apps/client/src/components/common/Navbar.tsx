'use client';

import { CheckIcon } from '@/components/icons/CheckIcon';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export function NavBar() {
  const session = useSession();
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <CheckIcon className="h-6 w-6" />
        <span className="sr-only">Todo App</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {session.data?.user ? (
          <Link
            href="/todos"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            ToDos
          </Link>
        ) : (
          <Link
            href="/sign-in"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Try it!
          </Link>
        )}
      </nav>
    </header>
  );
}
