/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './roles.entity';

@Entity()
export class Permissions{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, comment: 'Nombre del permiso.'})
    permission: string;

    @Column({comment: 'Descripción del permiso.'})
    description: string;

    @ManyToMany(()=> Roles, (role) => role.permissions)
    roles: Roles[];
}