import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({
        nullable: true
    })
    fotoId: number;

    @Column()
    password: string;


    constructor(id: number, fotoId: number, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fotoId = fotoId;
    }
}