import { AddressDto } from './address.dto';

export class CreateUserDto {

  email: string;

  fullName: string;

  phoneNo: number;

  password: string;

  address: AddressDto;

}

