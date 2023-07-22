import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/project'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
