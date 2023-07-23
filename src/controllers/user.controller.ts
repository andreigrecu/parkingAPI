import { Controller, Post, Body, Get, Res, Param} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ResponseFactory } from '../factories/ResponseFactory';
import { Response } from 'express';
import { AuthDto } from '../dtos/auth.dto';
import { PasswordService } from '../services/password.service';
import { CreateUserDto } from '../dtos/createUser.dto';

@Controller('users')
export class UserController {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
        private readonly userService: UserService,
        private readonly responseFactory: ResponseFactory,
        private readonly passwordService: PasswordService
    ) { }

    @Get()
    async get(
        @Res() response: Response
    ): Promise<any> {
        const users = await this.userModel.find();
        return this.responseFactory.ok(users, response);
    }

    @Post('login')
    async login(
        @Res() response: Response,
        @Body() authDto: AuthDto
    ): Promise<any> {
        let user = await this.userService.getByEmail(authDto.email);
        if(!user)
            return this.responseFactory.notFound({ _general: 'auth.user_not_found' }, response);

        const isValid = await this.passwordService.comparePassword(authDto.password, user.password);
        if(!isValid)
            return this.responseFactory.notFound({ _general: 'auth.user_not_found' }, response);

        const token = await this.passwordService.createToken(authDto.email, user.id);

        return new ResponseFactory().ok({ "user": user, "token": token }, response);
    }

    // aici trb sa punem din frontend niste validari - din backend nu le mai punem
    // regex email si poate numar maxim de caractere la nume 
    // ceva si la parola - basic > 6 caractere si un caracter mare - poate mai putin de 15 caractere ?
    @Post('register')
    async create(
        @Body() createUserDto: CreateUserDto,
        @Res() response: Response
    ): Promise<any> {

        const checkUserAlreadyRegistered = await this.userService.checkUserAlreadyRegistered(createUserDto.email);
        if(checkUserAlreadyRegistered === true)
            return this.responseFactory.forbidden('User already exists', response);
        // aici se poate trimite un email - nu e important 

        const user = await this.userService.create(createUserDto)
        if(!user)
            return this.responseFactory.error({ _general: 'users.user_can`t_be_created' }, response);

        return this.responseFactory.ok(user, response);
    }

    // Mai complicat, trb salvat in frontend id ul userului per sesiune - nu cred ca merita
    // @Post(':id/changePassword')
    // async changePassword(
    //     @Param('id') id: string,
    //     @Body() changePasswordDto: ChangePasswordDto,
    //     @Res() response: Response
    // ) {
    //     let user = await this.userService.findOne(id);
    //     if(!user)
    //         return this.responseFactory.notFound({ _general: 'users.user_not_found' }, response);
        
    //     const isValid = await this.passwordService.comparePassword(changePasswordDto.current_password, user.password);
    //     if(!isValid)
    //         return this.responseFactory.notFound({ _general: 'users.old_password_is_wrong' }, response);

    //     if(changePasswordDto.new_password.length < 6)
    //         return this.responseFactory.error({ _general: 'users.new_password_too_short' }, response);

    //     if(changePasswordDto.new_password !== changePasswordDto.confirm_password)
    //         return this.responseFactory.error({ _general: 'users.passwords don`t match'}, response);

    //     const password = await this.passwordService.generatePassword(changePasswordDto.new_password);
    //     user.password = password;

    //     user = await this.userService.updatePassword(user);
    //     if(!user)
    //         return this.responseFactory.error({ _general: 'users.password_didn`t change' }, response);

    //     return this.responseFactory.ok({ _general: 'users.password_changed' }, response);
    // }
}