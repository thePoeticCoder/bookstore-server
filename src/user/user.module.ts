import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from './user.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { EncryptionService } from 'src/utils/encryption.service';
import { TokenService } from 'src/user/toke.service';
import { JwtModule, } from '@nestjs/jwt';
import { AppConfig } from 'src/config';
@Module({
      imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  EncryptionService, JwtModule.register({
    secret: AppConfig.JWT_SECRET_KEY,
  })],
  controllers: [UserController],
  providers: [UserService,UserDao,EncryptionService,TokenService]
})
export class UserModule {}
