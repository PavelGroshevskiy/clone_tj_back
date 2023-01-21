import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @Length(6, 20, { message: 'password must be longer that 6 simbols' })
  password?: string;
}
