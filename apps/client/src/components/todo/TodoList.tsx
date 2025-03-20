import { TodoCard } from '@/components/todo/Todo';
import { auth } from '@/lib/auth';
import { ITodo } from '@todo-turbo/schema';
import React from 'react';

type Props = {
  todos: Array<ITodo>;
};

export async function TodoList({ todos }: Props) {
  const session = await auth();
  if (!session) {
    return (
      <div className="flex flex-col gap-y-4 w-full">
        <p>Need to sign in!</p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoCard key={todo._id} todo={todo} session={session} />
      ))}
    </div>
  );
}
