import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  fullName: string;

  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @IsNotEmpty()
  password?: string;
}
