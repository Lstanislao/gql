import { schemaComposer } from 'graphql-compose';
import { UserType } from '../todo/todo.dto';
import { createResolver } from '../utils/graphqlUtil';
import { TSignInInput } from './auth.dto';
import { authService } from './auth.service';

const signIn = createResolver<TSignInInput>({
  // type del body o argumentos en TYPESCRIPT!!!
  name: 'SignIn', // nombre que aparece en gql
  kind: 'mutation', // tipo de operacion
  description: 'Sign in user', // descripcion
  type: UserType, // lo que devuelve la funcion
  args: {
    record: UserType, // argumentos que recibe la funcion en GQL
  },
  resolve: async ({ args }) => {
    const user = await authService.signIn(args.record);
    return user;
  },
});
