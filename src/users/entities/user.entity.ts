import { Role } from "src/enums/role.enum";
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number;

    @Generated('uuid')
    @Column({unique: true})
    uuid: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type:"date",
        nullable: true
    })
    birth_date: Date;

    @Column({
        default: Role.USER,
    })
    role: number;

    @CreateDateColumn({
        type:"datetime"
    })
    created_at: Date;

    @UpdateDateColumn({
        type:"datetime"
    })
    updated_at: Date;

}
