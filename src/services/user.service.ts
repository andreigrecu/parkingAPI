import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User } from "../models/user.model";
import { CreateUserDto } from '../dtos/createUser.dto';
import { PasswordService } from '../services/password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly passwordService: PasswordService
  ) { }

  async create1(
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

  async getByEmail(
    email: String
  ): Promise<any> {
      return await this.userModel.findOne({email});
  }

  async checkUserAlreadyRegistered(
      email: string
  ): Promise<Boolean> {

    const checkUserAlreadyRegistered = await this.userModel.findOne({email});

    if(checkUserAlreadyRegistered)
        return true;

    return false;
  }

  async create(
    createUserDto: CreateUserDto
  ): Promise<any> {

    const password = await this.passwordService.generatePassword(createUserDto.password);

    let createdAt = new Date()
    let updatedAt = new Date()
    let firstName = createUserDto.firstName
    let lastName = createUserDto.lastName
    let email = createUserDto.email
    const newUserAction = new this.userModel({
      createdAt,
      updatedAt,
      firstName,
      lastName,
      email,
      password
    });
    
    console.log(newUserAction)
    return await newUserAction.save();
  }
}