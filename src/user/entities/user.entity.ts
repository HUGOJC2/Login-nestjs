/* eslint-disable prettier/prettier */
import { Roles } from "src/auth_user/entities/roles.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, comment: 'Nombre de usuario.'})
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    middle_name: string;
    
    @Column()
    last_name: string;

    @ManyToOne(()=> Roles)
    @JoinColumn({name: 'role_id'})
    roles: Roles;

    @Column({comment: 'Id del registro de rol.'})
    role_id: number;

    @Column({nullable: true})
    created_by: string;

    @Column({nullable: true, comment: 'Fecha de creación de registro.'})
    created_at: Date;

    @Column({nullable: true})
    updated_by: string;

    @Column({nullable: true})
    updated_at: Date;
}
