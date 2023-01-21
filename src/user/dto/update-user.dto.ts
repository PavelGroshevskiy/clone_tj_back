import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Length(3, 30, { message: 'name must be longer that 3 simbols' })
  fullName: string;

  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @Length(6, 20, { message: 'password must be longer that 6 simbols' })
  password?: string;
}
