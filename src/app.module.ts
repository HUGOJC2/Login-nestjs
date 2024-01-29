/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UserModule } from './user/user.module';
 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_BASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}', __dirname + '/**/**/*.entity{.ts,.js}' ],
      synchronize: true,
    }),
    LoginModule,
    RegisterModule,
    UserModule],
  controllers: [AppController, LoginController, RegisterController],
  providers: [AppService, LoginService, RegisterService],
})
export class AppModule {}
