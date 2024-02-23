/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthUserService } from './auth_user.service';
import { AuthUserController } from './auth_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { Permissions } from './entities/permissions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles, Permissions]),
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService], 
})
export class AuthUserModule {}
