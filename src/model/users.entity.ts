/* eslint-disable prettier/prettier */
import { PrimaryGeneratedColumn, Column,} from "typeorm";

export abstract class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    middle_name: string;

    @Column()
    last_name: string;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @Column()
    updated_by: string;

    @Column()
    updated_at: Date;
}