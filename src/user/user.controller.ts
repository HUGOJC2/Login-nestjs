/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Login } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/all')
  findAll() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.viewUser(+id);
  }

  @Get('/detail/:username')
  detailUser(@Param('username') username: string) {
    return this.userService.detailUser(username);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() signInDto: Login) {
    return this.userService.login(signInDto);
  }

  @Patch('/update_pass/:username')
  updatepass(@Param('username') username: string, @Body('password') password: string) {
    return this.userService.updatePass(username, password);
  }

  @Get('/:username/permissions')
  async findOneByUsernameWithRolePermissions(@Res() response, @Param('username') username: string) {
      try {
          const user = await this.userService.findOneByUsernameWithRolePermissions(username);
          return response.status(HttpStatus.OK).json({ payload: user });
      } catch (error) {
          return response.status(error.status).json(error.response);
      }
  }

  @Get('/:start_date/:end_date')
  findUsers(@Param('start_date') strDate1: string, @Param('end_date') strDate2: string){
    const date1 = new Date(strDate1).toLocaleString();
    const date2 = new Date(strDate2).toLocaleString();
    return this.userService.findUsers(date1, date2);
  }

}
