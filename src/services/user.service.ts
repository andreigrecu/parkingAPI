import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User } from "../models/user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) { }

  async create(
    createdAt: Date,
    updatedAt: Date,
    name: string,
    email: string
  ) {
    const newCustomerAction = new this.userModel({
      createdAt,
      updatedAt,
      name,
      email
    });
    return await newCustomerAction.save();
  }
}