import { useMutation } from '@tanstack/react-query';
import {
  ITodo,
  TCreateTodoSchema,
  TUpdateTodoSchema,
} from '@todo-turbo/schema';
import { createOneTodo, updateOneTodo } from '@todo-turbo/services';

type TCreateTodo = {
  token: string;
  appVersion: string;
};

export function useCreateTodo({ token, appVersion }: TCreateTodo) {
  return useMutation<ITodo | null, Error, TCreateTodoSchema>({
    mutationKey: ['create-todo'],
    async mutationFn(input) {
      try {
        const data = createOneTodo(
          { baseURL: process.env.NEXT_PUBLIC_API_URL!, token, appVersion },
          input
        );
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  });
}

export function useUpdateTodo({ token, appVersion }: TCreateTodo) {
  return useMutation<ITodo | null, Error, TUpdateTodoSchema & { uid: string }>({
    mutationKey: ['update-todo'],
    async mutationFn(input) {
      try {
        const data = updateOneTodo(
          { baseURL: process.env.NEXT_PUBLIC_API_URL!, token, appVersion },
          input.uid,
          input
        );
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  });
}
