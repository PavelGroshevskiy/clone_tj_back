import { IsEmail, Length } from 'class-validator';
import { UniqueOnDatabase } from '../../validations/UniqueValidation';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @Length(3, 30, { message: 'name must be longer that 3 simbols' })
  fullName: string;

  @IsEmail(undefined, { message: 'Wrong email' })
  //CHECK VALIDATION
  // @UniqueOnDatabase(User, { message: 'Alredy exist' })
  email: string;

  @Length(6, 20, { message: 'password must be longer that 6 simbols' })
  password?: string;
}
