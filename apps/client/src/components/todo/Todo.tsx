'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import { FilePenIcon } from '@/components/icons/FilePenIcon';
import { TrashIcon } from '@/components/icons/TrashIcon';
import { MarkTodoDoneButton } from '@/components/todo/MarkTodoDoneButton';
import { Button } from '@/components/ui/button';
import { ITodo } from '@todo-turbo/schema';
import { Session } from 'next-auth';
import React from 'react';

dayjs.extend(relativeTime);

type Props = {
  todo: ITodo;
  session: Session;
};

export function TodoCard({ todo, session }: Props) {
  const time = dayjs(new Date(todo.createdAt)).fromNow();
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-md shadow-sm transition-colors ${
        todo.done
          ? 'bg-muted text-muted-foreground line-through'
          : 'bg-background hover:bg-muted'
      }`}
    >
      <div className="flex items-center gap-4">
        <MarkTodoDoneButton todo={todo} session={session} />
        <div>
          <div className="font-medium">{todo.title}</div>
          <div className="text-sm text-muted-foreground">
            <div>{todo.content}</div>
          </div>
          <div className="text-xs text-muted-foreground">Since: {time}</div>
          <div className="text-xs text-muted-foreground">Due: {'  '}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-muted/50 text-muted-foreground"
        >
          <FilePenIcon className="w-4 h-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-muted/50 text-muted-foreground"
        >
          <TrashIcon className="w-4 h-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  );
}
