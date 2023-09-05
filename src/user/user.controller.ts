
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import ParamsWithId from '../utils/validator.paramWithId';
import MongooseClassSerializerInterceptor from '../utils/MongooseClassSerializer';
import { User } from 'src/schema/user.schema';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { LoginUserDto } from 'src/dto/login.user.dto';

@Controller('user')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UserController {
	constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser() {
    return this.userService.findAllUSer();
  }

  @Get(':id')
  async getUserById(@Param() { id }: ParamsWithId) {
  	return this.userService.findUserById(id);
  }

@Post('createUser')
  async createUser(
    @Body() userData: CreateUserDto,
    
  ) {
    return this.userService.createUser(userData);
  }

  @Post('login')
  async loginUser(
    @Body() userData: LoginUserDto,
    
  ) {
    return this.userService.loginUser(userData);
  }

	@Put('updateUSerById')
  	async updateBook(
    @Param() { id }: ParamsWithId,
    @Body() bookData: CreateUserDto,
  ) {
    return this.userService.updateUser(id, bookData);
  }

@Delete('deleteUserById')
  async deleteBook(@Param() { id }: ParamsWithId) {
    return this.userService.deleteUserById(id);
  }
}
