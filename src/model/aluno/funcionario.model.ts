import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user.model";

@Entity()
export class Funcionario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @OneToOne(() => User, {
        createForeignKeyConstraints: true
    })
    @JoinColumn()
    usuario: User;

    @Column({
        type: 'timestamp'
    })
    dataNascimento: Date;

    @Column()
    cpf: string;


    @Column({
        nullable: true
    })
    email?: string;

    constructor(id: number, password: string, dataNascimento: Date, nome: string, cpf: string, usuario: User) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.usuario = usuario;
    }
}