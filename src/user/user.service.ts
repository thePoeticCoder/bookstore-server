import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserDao } from './user.dao';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { Types } from 'mongoose';
import { EncryptionService } from 'src/utils/encryption.service';
import { LoginUserDto } from 'src/dto/login.user.dto';
import { TokenService } from './toke.service';

@Injectable()
export class UserService {
  @Inject()
  private encryptionService: EncryptionService;

  @Inject()
  private tokenService: TokenService;

  constructor(private readonly userDao: UserDao) {}

  async findAllUsers() {
    return this.userDao.findAll();
  }

  async findUserById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    return this.userDao.findOne(id);
  }

  async createUser(userData: CreateUserDto) {
    const { email, password } = userData;

    const existingUser = await this.userDao.findOneByEmail(email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const encryptedPassword =
      await this.encryptionService.encryptPassword(password);
    userData.password = encryptedPassword;

    return this.userDao.create(userData);
  }

  async loginUser(userData: LoginUserDto) {
    const { email, password } = userData;

    const existingUser = await this.userDao.findOneByEmail(email);
    if (!existingUser) {
      throw new NotFoundException('User does not exist');
    }

    const { _id, phoneNo } = existingUser;
    const isMatched = await this.validateUser(password, existingUser.password);

    if (isMatched) {
      const payload = { _id, email, phoneNo };
      const tokenData = await this.tokenService.getToken(payload);
      return tokenData;
    } else {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async updateUser(id: string, userData: CreateUserDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    return this.userDao.update(id, userData);
  }

  async deleteUserById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    return this.userDao.delete(id);
  }

  async validateUser(reqPassword: string, dbPassword: string) {
    const passwordMatched = await this.encryptionService.comparePassword(
      reqPassword,
      dbPassword,
    );
    if (!passwordMatched) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    return passwordMatched;
  }

  async clearCookie(res: any) {
    const emptyCookie = [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
    res.setHeader('Set-Cookie', emptyCookie);
  }
}
