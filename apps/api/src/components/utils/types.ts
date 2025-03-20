import {
  Document,
  Model,
  PopulateOptions,
  ProjectionType,
  Schema,
  Types,
} from 'mongoose';

// FIXME: @avila-tek/mongoose-algolia types are not exported
type TIndexName = string | ((args: any) => string);
type TSelector<T> = ProjectionType<T> | null | undefined;
type TDefault = Record<string, any> | null | undefined;
type TMappings = { [key: string]: (doc: any) => any } | null | undefined;
type TVirtuals = Record<string, (doc: any) => any> | null | undefined;
type TFilter = ((doc: any) => any) | null | undefined;
type TPopulate =
  | string
  | PopulateOptions
  | (PopulateOptions | string)[]
  | null
  | undefined;

export type TMongooseAlgoliaOptions<T = Schema> = {
  indexName: TIndexName;
  appId: string;
  apiKey: string;
  selector?: TSelector<T>;
  defaults?: TDefault;
  mappings?: TMappings;
  virtuals?: TVirtuals;
  filter?: TFilter;
  populate?: TPopulate;
  debug?: boolean;
  chunkSize?: number;
};

export type TDocument<T> = Document<Types.ObjectId, object, T> & T;
export type AlgoliaModel<T> = Model<TDocument<T>> & {
  syncToAlgolia?: () => Promise<void>;
  setAlgoliaSettings?: (...args: any[]) => void;
};
