/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permissions } from './permissions.entity';

@Entity()
export class Roles{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, comment: 'Nombre del Rol.'})
    role: string;

    @ManyToMany(() => Permissions, (permission) => permission.roles)
    @JoinTable({
        name: 'role_has_permissions',
        joinColumn:{
            name: 'roles_id'
        },
        inverseJoinColumn: {
            name: 'permissions_id'
        },
    })
    permissions: Permissions[];
}