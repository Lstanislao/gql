import { z } from 'zod';

export const signInInput = z.object({
  email: z.string().email().min(5),
  password: z.string().min(8),
});

export const SignInInput = `
  input SignInInput {
    emailOrUsername: String!
    password: String!
  }
`;

export type TSignInInput = z.infer<typeof signInInput>;

export const signUpInput = z.object({
  email: z.string().email().min(5),
  password: z.string().min(8),
  name: z.string().min(1),
});

export const SignUpInput = `
  input SignUpInput {
    email: String!
    password: String!
    name: String!
  }
`;

export type TSignUpInput = z.infer<typeof signUpInput>;
