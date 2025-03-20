'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateTodo } from '@/hooks/todo';
import { APP_VERSION } from '@/lib/consts';
import { ITodo } from '@todo-turbo/schema';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  todo: ITodo;
  session: Session;
};

export function MarkTodoDoneButton({ todo, session }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync } = useUpdateTodo({
    token: session.user.token,
    appVersion: APP_VERSION,
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    let res = null;
    try {
      console.log(data);
      res = await mutateAsync({
        done: !todo.done,
        uid: todo.uid,
        content: todo.content,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error creating the Todo',
        description: 'An error has before sending the info',
      });
    }
    if (res) {
      console.log(res);
      router.refresh();
    }
  };
  return (
    <form
      className="items-center justify-end flex space-x-2"
      onSubmit={onSubmit}
    >
      <Checkbox id="done" name="done" type="submit" checked={todo.done} />
    </form>
  );
}
