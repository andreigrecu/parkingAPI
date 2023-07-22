import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from "../models/user.model";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

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
        UserService    
    ],
    controllers: [
      UserController
    ]
})
export class CustomerModule {}