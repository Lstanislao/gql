import { schemaComposer } from 'graphql-compose';
import { UserType } from '../user/user.dto';
import { createResolver } from '../utils/graphqlUtil';
import { SignInInput, TSignInInput } from './auth.dto';
import { authService } from './auth.service';

// type del body o argumentos en TYPESCRIPT!!!
const signIn = createResolver<TSignInInput>({
  name: 'SignIn', // nombre que aparece en gql
  kind: 'mutation', // tipo de operacion
  description: 'Sign in user', // descripcion
  type: UserType, // lo que devuelve la funcion
  args: {
    record: SignInInput, // argumentos que recibe la funcion en GQL
  },
  resolve: async ({ args }) => {
    const user = await authService.signIn(args.record);
    return user;
  },
});

export const authQueries = {};

export const authMutations = {
  signIn,
};
