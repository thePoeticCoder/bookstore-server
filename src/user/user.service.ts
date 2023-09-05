import { Injectable } from '@nestjs/common';
import { UserDao } from './user.dao';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class UserService {

	constructor(private readonly userDao: UserDao) { }


	async findAllUSer() {
		return this.userDao.findAll();
	}

	async findUserById(id: ObjectId) {

		return this.userDao.findOne(id);
	}

	async createUser(categoryData: CreateUserDto,) {
		return this.userDao.create(categoryData);
	}

	async updateUser(id: ObjectId, bookData: CreateUserDto) {
		return this.userDao.update(id, bookData);
	}

	async deleteUserById(bookId: ObjectId) {
		return this.userDao.delete(bookId);
	}
}
