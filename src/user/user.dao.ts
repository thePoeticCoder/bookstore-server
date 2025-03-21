import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from '../dto/create.user.dto';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class UserDao {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string | Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const userData = await this.userModel.findById(new Types.ObjectId(id));

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    return userData;
  }

  async findOneByEmail(email: string) {
    const userData = await this.userModel.findOne({ email });

    if (!userData) {
      return false;
    }

    return userData;
  }

  async create(userData: CreateUserDto) {
    console.log('Creating a new user');
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async update(id: string | Types.ObjectId, userData: CreateUserDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, userData, { new: true })
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async delete(userId: string | Types.ObjectId) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid ID format');
    }

    const result = await this.userModel.findByIdAndDelete(userId);
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
