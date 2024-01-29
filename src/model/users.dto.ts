/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from "class-validator";
import { Users } from './users.entity';


export class UsersDTO implements Readonly<UsersDTO> {
    @ApiProperty({ required: true})
    @IsUUID()
    id: number;

    @ApiProperty({ required: true})
    @IsString()
    username: string;

    @ApiProperty({ required: true})
    @IsString()
    password: string;

    @ApiProperty({ required: true})
    @IsString()
    name: string;

    @ApiProperty({ required: true})
    @IsString()
    middle_name: string;

    @ApiProperty({ required: true})
    @IsString()
    last_name: string;

    public static from(dto: Partial<UsersDTO>) {
        const it = new UsersDTO();
        it.id = dto.id;
        it.username = dto.username;
        it.password = dto.password;
        it.name = dto.name;
        it.middle_name = dto.middle_name;
        it.last_name = dto.last_name;
        return it;
    }

    public static fromEntity(entity: Users) {
        return this.from({
            id: entity.id,
            username: entity.username,
            password: entity.password,
            name: entity.name,
            middle_name: entity.middle_name,
            last_name: entity.last_name,
        });
    }

    public toEntity(user: Users = null) {
        const it = new Users();
        it.id = this.id;
        it.username = this.username;
        it.password = this.password;
        it.name = this.name;
        it.middle_name = this.middle_name;
        it.last_name = this.last_name;
        it.created_by = user ? user.id : null;
        it.created_at = new Date();
        it.updated_by = user ? user.id : null;
        it.updated_at = new Date() || null;
        return it;
    }
}