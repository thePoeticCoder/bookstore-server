import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from './user.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { EncryptionService } from 'src/utils/encryption.service';

@Module({
      imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  EncryptionService],
  controllers: [UserController],
  providers: [UserService,UserDao,EncryptionService]
})
export class UserModule {}
