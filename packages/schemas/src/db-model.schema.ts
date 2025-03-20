import { z } from 'zod';

export const baseDatabaseModel = z.object({
  _id: z.any(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
});

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  perPage: z.number().min(1).default(10),
  filter: z.any(),
});

export const paginationResponseSchema = z.object({
  items: z.array(z.any()),
  page: z.number(),
  perPage: z.number(),
  hasNext: z.boolean(),
  hasPrevius: z.boolean(),
  total: z.number(),
  totalOfPages: z.number(),
});
