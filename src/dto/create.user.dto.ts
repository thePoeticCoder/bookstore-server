import { AddressDto } from './address.dto';

export class CreateUserDto {

  email: string;

  fullName: string;

  phoneNo: string;

  password: string;

  address: AddressDto;

}

