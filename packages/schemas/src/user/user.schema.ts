import { z } from 'zod';
import { baseDatabaseModel } from '../db-model.schema';

export const userType = baseDatabaseModel.extend({
  email: z.string().email().min(5),
  password: z.string().min(8).optional(),
  name: z.string().min(1),
});

export const createUserInput = z.object({
  email: z.string().email().min(5),
  password: z.string().min(8),
  name: z.string().min(1),
});

export type TCreateUserInput = z.infer<typeof createUserInput>;
export type IUser = z.infer<typeof userType>;
