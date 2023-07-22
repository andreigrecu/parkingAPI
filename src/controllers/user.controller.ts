import { Controller, Post, Body, Get, Res} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { ResponseFactory } from '../factories/ResponseFactory';
import { Response } from 'express';

@Controller('users')
export class UserController {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
        private readonly userService: UserService,
        private readonly responseFactory: ResponseFactory
    ) { }

    @Post()
    async create(
        @Body() userDto: UserDto,
        @Res() response: Response
    ): Promise<any> {

        const user = await this.userService.create(
            new Date(),
            new Date(),
            userDto.name,
            userDto.email
        )
        return this.responseFactory.ok(user, response);
    }

    @Get()
    async get(
        @Res() response: Response
    ): Promise<any> {
        const users = await this.userModel.find();
        return this.responseFactory.ok(users, response);
    }

}