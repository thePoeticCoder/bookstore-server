import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserDao } from './user.dao';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { ObjectId } from 'mongoose';
import { EncryptionService } from 'src/utils/encryption.service';
import { LoginUserDto } from 'src/dto/login.user.dto';
import { TokenService } from 'src/user/toke.service';

@Injectable()
export class UserService {
@Inject()
private encryptionService:EncryptionService

@Inject()
private tokenService:TokenService

	constructor(private readonly userDao: UserDao ,) { }


	async findAllUSer() {
		return this.userDao.findAll();
	}

	async findUserById(id: ObjectId) {

		return this.userDao.findOne(id);
	}

	async createUser(userData: CreateUserDto,) {
	const {email, password} = userData;
    const existingUser = await this.userDao.findOneByEmail(email);
    if (existingUser) {
        throw new HttpException('USER ALREADY EXISTS', HttpStatus.FORBIDDEN);
          }

    try {
        const encryptedPassword = await this.encryptionService.encryptPassword(password) 
		userData.password = encryptedPassword;
        return await this.userDao.create(userData);
        
    }
    catch (err) {
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
	}

	async loginUser(userData: LoginUserDto,) {
	const {email, password} = userData;
    const existingUser = await this.userDao.findOneByEmail(email);
	
    if (!existingUser) {
        throw new HttpException('USER DOES NOT EXISTS', HttpStatus.FORBIDDEN);
        }

    try {
		const {_id,phoneNo} = existingUser
		const isMatched = await this.validateUser(password,existingUser.password)
		const payload = {
			_id,
			email,
			phoneNo
		}
		if(isMatched){
			const tokenData = await this.tokenService.getToken(payload)

			return {
				...tokenData
			}
		}
		return "User Data Does Not Matched"

    }
    catch (err) {
        throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
	}

	async updateUser(id: ObjectId, bookData: CreateUserDto) {
		return this.userDao.update(id, bookData);
	}

	async deleteUserById(bookId: ObjectId) {
		return this.userDao.delete(bookId);
	}

	async validateUser(reqPassword: string, dbPassword: string) {
    try{
    const passwordMatched=await this.encryptionService.comparePassword(reqPassword,dbPassword)
    return passwordMatched;

    }catch(err){
    throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
  }
}
