/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    console.log(user.username);
    user.username = createUserDto.username;
    console.log(user.username);
    user.password = createUserDto.password;
    user.name = createUserDto.name;
    user.middle_name = createUserDto.middle_name;
    user.last_name = createUserDto.last_name;
    user.created_at = new Date();
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<User[]>{
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.name = updateUserDto.name;
    user.middle_name = updateUserDto.middle_name;
    user.last_name = updateUserDto.last_name;
    user.updated_at = new Date();
    user.id = id;
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number}> {
    return this.userRepository.delete(id);
  }
}
