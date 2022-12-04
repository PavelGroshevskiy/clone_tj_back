import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(dto: CreateUserDto) {
    return this.userRepository.save(dto);
  }

  findAll() {
    return this.userRepository.find({});
  }

  findById(id: number) {
    return this.userRepository.findOneById(id);
  }

  findByCond(cond: LoginUserDto) {
    return this.userRepository.findOneBy(cond);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
