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
        type: 'date',
        nullable: true
    })
    dataNascimento?: Date;

    @Column()
    cpf: string;


    @Column({
        nullable: true
    })
    email?: string;

    constructor(id: number, nome: string, usuario: User, dataNascimento: Date, cpf: string, email: string) {
        this.id = id;
        this.nome = nome;
        this.usuario = usuario;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
    }
}