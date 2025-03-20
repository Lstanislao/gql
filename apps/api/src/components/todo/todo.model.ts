import { randomUUID } from 'node:crypto';
import { ITodo } from '@todo-turbo/schema';
import { Document, Schema, Types, model } from 'mongoose';

export type TTodoDocument = Document<Types.ObjectId, any, ITodo> & ITodo;

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      trim: true,
      required: false,
    },
    content: {
      type: String,
      trim: true,
      required: [true, ''],
    },
    uid: {
      type: String,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    done: {
      type: Boolean,
      default: false,
      reuired: false,
    },
    dueBy: {
      type: Date,
      default: null,
      required: false,
    },
  },
  { timestamps: true }
);

todoSchema.pre('save', function (next) {
  if (typeof this.uid === 'undefined') {
    this.uid = randomUUID().toString();
  }
  next();
});

export const Todo = model<typeof todoSchema>('Todo', todoSchema);
