import { Footer } from '@/components/common/Footer';
import { NavBar } from '@/components/common/Navbar';
import { CreateTodo } from '@/components/todo/CreateTodo';
import { TodoList } from '@/components/todo/TodoList';
import { auth } from '@/lib/auth';
import { APP_VERSION } from '@/lib/consts';
import { getTodoPagination } from '@todo-turbo/services';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function TodoPage() {
  const session = await auth();
  if (!session) {
    return redirect('/sign-in?callback=/todos');
  }
  const data = await getTodoPagination(
    {
      baseURL: process.env.NEXT_PUBLIC_API_URL!,
      token: session.user.token,
      appVersion: APP_VERSION,
    },
    {
      page: 1,
      perPage: 10,
      filter: {
        owner: session.user._id,
      },
    }
  );
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <NavBar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md lg:max-w-lg px-4 py-8">
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Create a Todo</h2>
              <p className="text-muted-foreground">
                Enter the details of your new todo.
              </p>
            </div>
            <CreateTodo session={session} />
          </div>
        </div>
        <div className="w-full max-w-md lg:max-w-lg px-4 py-8">
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Your Todos</h2>
              <p className="text-muted-foreground">
                View and manage your todos.
              </p>
            </div>
            <TodoList todos={data?.items ?? []} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
