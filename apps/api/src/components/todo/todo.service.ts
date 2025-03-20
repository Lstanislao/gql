import { Todo } from '@/components/todo/todo.model';
import { TCreateTodoSchema } from '@repo/schemas';
import {
  TPaginationParams,
  createPagination,
  safeJSONParse,
} from '@repo/utils';

async function createOne(input: TCreateTodoSchema, userId?: string) {
  try {
    input.owner = userId;
    const todo = await Todo.create(input);
    return {
      success: true,
      data: todo,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
}

async function updateOne(uid: string, input: TCreateTodoSchema) {
  try {
    const todo = await Todo.findOne({ uid });
    if (!todo) {
      return {
        success: false,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
  try {
    const todo = await Todo.findOneAndUpdate({ uid }, input, {
      new: true,
      runValidators: true,
    });
    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
}

async function findOne(uid: string) {
  try {
    const todo = await Todo.findOne({ uid });
    if (!todo) {
      return {
        success: false,
      };
    }
    return {
      success: true,
      data: todo,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
}

async function pagination(input: TPaginationParams) {
  try {
    const data = await createPagination(Todo, {
      filter: safeJSONParse(input.filter),
      page: parseInt(input.page, 10),
      perPage: parseInt(input.perPage, 10),
    });
    return {
      success: true,
      data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
}

export const todoService = Object.freeze({
  createOne,
  updateOne,
  findOne,
  pagination,
});
