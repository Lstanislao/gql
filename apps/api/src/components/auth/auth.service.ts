import jwt from 'jsonwebtoken';
import { userService } from '../user/user.service';
import { TSignInInput, TSignUpInput } from './auth.dto';

async function signIn(input: TSignInInput) {
  const user = await userService.findOne({ email: input.email });
  if (!user) {
    throw new Error('404');
  }
  if (await userService.checkPassword(user, input.password)) {
    const token = jwt.sign({ id: user._id }, String(process.env.SECRET_JWT));
    return {
      user: {
        ...user.toJSON(),
        // we prevent leaking the password hash to the client
        password: undefined,
      },
      token,
    };
  }
  throw new Error('401');
}

async function signUp(input: TSignUpInput) {
  const user = await userService.createOne(input);
  const token = jwt.sign({ id: user._id }, String(process.env.SECRET_JWT));
  return {
    user: {
      ...user.toJSON(),
      // we prevent leaking the password hash to the client
      password: undefined,
    },
    token,
  };
}

export const authService = Object.freeze({
  signIn,
  signUp,
});
