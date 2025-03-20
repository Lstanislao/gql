'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useCreateTodo } from '@/hooks/todo';
import { APP_VERSION } from '@/lib/consts';
import { createTodoSchema } from '@todo-turbo/schema';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useFeatureFlagEnabled, usePostHog } from 'posthog-js/react';
import React from 'react';

type Props = {
  session: Session;
};

export function CreateTodo({ session }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const posthog = usePostHog();
  const flagEnabled = useFeatureFlagEnabled('create-todo');

  // const {} = useFrea
  const { mutateAsync } = useCreateTodo({
    token: session.user.token,
    appVersion: APP_VERSION,
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    let res = null;
    try {
      res = await mutateAsync(createTodoSchema.parse(data));
      posthog.capture('new_todo', {
        todo_id: res?.uid,
        user: session.user.email,
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
  if (flagEnabled) {
    return (
      <form className="grid w-full gap-2" onSubmit={onSubmit}>
        <Label htmlFor="content">Add new task</Label>
        <Textarea name="content" id="content" placeholder="Add new task" />
        <Button type="submit">Save it!</Button>
      </form>
    );
  }
  return null;
}
