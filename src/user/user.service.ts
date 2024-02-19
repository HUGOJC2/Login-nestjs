/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Login } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: {
          username: createUserDto.username,
      },
    });

    if(userFound)
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);

    const user: User = new User();
    user.username = createUserDto.username;
    user.password = await this.hashPassword(createUserDto.password);
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

  detailUser(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
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

  async updatePass(username: string, password: string){
    const user = await this.detailUser(username);
    user.password = await this.hashPassword(password);
    this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number}> {
    return this.userRepository.delete(id);
  }

  async login(usern: Login): Promise<{token: string}>{
    const user =  await this.userRepository.findOne({where: {username: usern.username}});
    
    if(!await bcrypt.compare(usern.password, user.password)){
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username} ;

    return {  
      token: await this.jwtService.signAsync(payload),
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

}
