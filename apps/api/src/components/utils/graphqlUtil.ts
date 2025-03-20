import { Resolver, ResolverDefinition, schemaComposer } from 'graphql-compose';

export function createResolver<T>(
  opts: ResolverDefinition<
    any,
    any,
    { data: T } | { data: T; filter: any } | any
  >
): Resolver<any, any, any, any> {
  return schemaComposer.createResolver<
    any,
    { data: T } | { data: T; filter: any } | any
  >({
    ...opts,
    resolve: async (args) => {
      try {
        const data = await opts.resolve!(args);
        return data;
      } catch (err) {
        console.log(err);
        throw new Error('Internal Server Error');
      }
    },
  });
}
