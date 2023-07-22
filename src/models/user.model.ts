import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  name: { type: String },
  email: { type: String }
});

export interface User extends mongoose.Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: String;
  email: String;
}