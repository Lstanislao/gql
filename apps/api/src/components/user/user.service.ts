// import { TSignUpInput } from '@/components/auth/auth.dto';
// import { User } from '@/components/users/user.model';
// import { IUser } from '@todo-turbo/schema';
import argon2 from 'argon2';
import { TSignUpInput } from '../auth/auth.dto';
import { User } from './user.model';
import { IUser } from '@repo/schemas';

function findOne(filter: Record<string, string>) {
  return User.findOne(filter).exec();
}

async function createOne(input: TSignUpInput) {
  input.password = (await argon2.hash(input.password)).toString();
  return User.create(input);
}

function checkPassword(user: IUser, password: string) {
  if (typeof user.password === 'undefined') {
    return Promise.resolve(false);
  }
  return argon2.verify(user.password, password);
}

export const userService = Object.freeze({
  findOne,
  createOne,
  checkPassword,
});
