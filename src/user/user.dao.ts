import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from '../dto/create.user.dto';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class UserDao {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: ObjectId) {
    const userData = await this.userModel.findById(id);
    if (!userData) {
      throw new NotFoundException();
    }
    return userData;
  }

    async findOneByEmail(email: string) {
    const userData = await this.userModel.findOne({email:email});
    if (!userData) {
		return false;
    }
    return userData;
  }

  create(userData: CreateUserDto,) {
	console.log("I am creating an Users");
    const createdUser = new this.userModel({
      ...userData,
      
    });
    return createdUser.save();
  }

  async update(id: ObjectId, userData: CreateUserDto) {
    const user = await this.userModel
      .findOneAndReplace(id, userData)
      .setOptions({ overwrite: true, new: true });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async delete(userId: ObjectId) {
    const result = await this.userModel.findByIdAndDelete(userId);
    if (!result) {
      throw new NotFoundException();
    }
  }
}






