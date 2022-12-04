import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @IsNotEmpty()
  password?: string;
}
