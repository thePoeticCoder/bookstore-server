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
    const userData = await this.userModel.findById(id).populate('author');
    if (!userData) {
      throw new NotFoundException();
    }
    return userData;
  }

  create(userData: CreateUserDto,) {
	console.log("I am creating an books");
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






