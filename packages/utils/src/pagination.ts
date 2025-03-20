import { Model } from 'mongoose';

export type TPaginationInput = {
  filter: Record<string, any>;
  page: number;
  perPage: number;
};

export type TPaginationParams = {
  page: string;
  perPage: string;
  filter: string;
};

export type TPaginationResult<T> = {
  items: Array<T>;
  page: number;
  perPage: number;
  hasNext: boolean;
  hasPrevius: boolean;
  total: number;
  totalOfPages: number;
};

export async function createPagination<TModel = unknown>(
  model: Model<TModel>,
  { filter, page, perPage }: TPaginationInput
): Promise<TPaginationResult<TModel>> {
  if (page <= 0 || perPage <= 0) {
    throw new TypeError(
      `[PAGINATION] - variables page or perPage cannot be negative`
    );
  }
  const total = await model.countDocuments(filter);
  const totalOfPages = Math.ceil(total / perPage);
  if (page > totalOfPages) {
    throw new Error('not-found');
  }
  const data = await model.find(filter, '', {
    skip: (page - 1) * perPage,
    limit: page * perPage,
  });
  return {
    items: data,
    page,
    perPage,
    hasNext: totalOfPages > page,
    hasPrevius: page > 1,
    total,
    totalOfPages,
  };
}
