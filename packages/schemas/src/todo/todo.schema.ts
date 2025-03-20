import { z } from 'zod';
import { baseDatabaseModel } from '../db-model.schema';
import { userType } from '../user/user.schema';

export const todoType = baseDatabaseModel.extend({
  uid: z.string().uuid(),
  title: z.string().optional(),
  content: z.string().min(1).trim(),
  owner: z.union([z.any(), userType]),
  done: z.boolean().default(false),
  dueBy: z.union([z.string(), z.date()]).nullable().optional(),
});

export type ITodo = z.infer<typeof todoType>;

export const createTodoSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1).trim(),
  owner: z.string().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1).trim(),
  done: z.boolean().optional(),
  dueBy: z.string().nullable().optional(),
});

export type TCreateTodoSchema = z.infer<typeof createTodoSchema>;

export type TUpdateTodoSchema = z.infer<typeof updateTodoSchema>;
