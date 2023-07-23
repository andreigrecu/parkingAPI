import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String }
});

export interface User extends mongoose.Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}