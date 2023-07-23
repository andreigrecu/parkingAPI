import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from "../models/user.model";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { ResponseFactory } from '../factories/ResponseFactory';
import { PasswordService } from '../services/password.service';

@Module({
    imports:[
        MongooseModule.forFeature(
            [
              { name: 'User', schema: UserSchema },
            ]
          ),    
    ],
    exports: [],
    providers: [
        UserService,
        ResponseFactory,
        PasswordService    
    ],
    controllers: [
      UserController
    ]
})
export class UserModule {}