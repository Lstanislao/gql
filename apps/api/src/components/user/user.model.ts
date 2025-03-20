import { IUser } from '@repo/schemas';
import { Document, Schema, Types } from 'mongoose';
import { initializeModel } from '../utils/initializeModel';

export type TUserDocument = Document<Types.ObjectId, any, IUser> & IUser;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);

const { Model: User, ModelTC: UserTC } = initializeModel<TUserDocument>({
  schema: userSchema,
  modelName: 'User',
});

// Agregar relaciones
// UserTC.addRelation('shopCart', {
//   resolver: () => UserTC.mongooseResolvers.dataLoader(),
//   prepareArgs: {
//     _id: (source) => source.name,
//   },
//   projection: { section: true },
// });

export { User, UserTC };
