import { Controller, Post, Body, Get, Put, Delete,Param, UseGuards, UseFilters, Res} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';

@Controller('users')
export class UserController {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
        private readonly userService: UserService
    ) { }

    @Post()
    async create(
        @Body() userDto: UserDto,
    ): Promise<User> {

        const user = await this.userService.create(
            new Date(),
            new Date(),
            userDto.name,
            userDto.email
        )
        return user;
    }

    @Get()
    async get(
    ): Promise<User[]> {
        const users = await this.userModel.find();

        return users;
    }

}