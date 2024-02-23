/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { Permissions } from './entities/permissions.entity';

@Injectable()
export class AuthUserService {

    constructor(@InjectRepository(Roles) private roleRepository:Repository<Roles>,
    @InjectRepository(Permissions) private permissionsRepository: Repository<Permissions>) {}

    async getRoles(){
        const rolesList = await this.roleRepository.find();
        const data = [];

        for (const role of rolesList) {
            data.push({
                id: role.id,
                role: role.role,
                permissions: role.permissions
            })
        }
        return data;
    }

    async getPermissions(){
        const permissionList = await this.permissionsRepository.find();
        const data = [];
        permissionList.map( permission => {
            data.push({
                id: permission.id,
                permission: permission.permission,
                description: permission.description
            });
        });
        return data;
    }
}
