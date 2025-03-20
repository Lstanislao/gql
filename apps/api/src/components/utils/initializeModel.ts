// import { algoliaIntegration } from '@avila-tek/mongoose-algolia';
import { composeMongoose } from 'graphql-compose-mongoose';
import { Document, Schema, Types, model } from 'mongoose';
import { AlgoliaModel, TMongooseAlgoliaOptions } from './types';

interface AlgoliaIndex {
  indexName: string;
  indexSettings: {
    searchableAttributes: string[];
    attributesForFaceting: string[];
    customRanking?: string[];
    paginationLimitedTo?: number;
  };
}

interface AlgoliaOptions extends TMongooseAlgoliaOptions {
  indexes: AlgoliaIndex[];
}

interface InitModelRecord<DocType = any> {
  schema: Schema<Document<Types.ObjectId, any, DocType> & DocType>;
  algoliaOptions?: Omit<AlgoliaOptions, 'appId' | 'apiKey' | 'indexName'>;
  modelName: string;
}

export function initializeModel<DocType extends Document<any, any, any>>({
  schema,
  modelName,
  algoliaOptions,
}: InitModelRecord) {
  const isCronjob = !!process.env.CRON_JOB_ID;
  const isChildProcess = !!process.env.CHILD_PROCESS_ID;
  const isMainProcess = !isCronjob && !isChildProcess;

  // 2. Setup Algolia Integration (optional)
  const algoliaIndexes = algoliaOptions?.indexes?.length;
  // if (algoliaIndexes) {
  //   schema.plugin(algoliaIntegration, {
  //     appId: process.env.ALGOLIA_APP_ID,
  //     apiKey: process.env.ALGOLIA_PRIVATE_KEY,
  //     debug: true,
  //     ...algoliaOptions,
  //   });
  // }

  // 3. Create the Mongoose Model
  const Model = model<DocType>(modelName, schema);
  const ModelTC = composeMongoose<DocType>(Model);

  if (!algoliaIndexes || !isMainProcess) return { Model, ModelTC };

  // 4. Sync to Algolia (only in main process)
  // const AlgoliaModel = Model as AlgoliaModel<DocType>;
  // AlgoliaModel.syncToAlgolia();

  return { Model, ModelTC };
}
