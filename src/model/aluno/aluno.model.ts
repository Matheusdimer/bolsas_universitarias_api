import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user.model";
import {Sexo} from "../../enums/sexo";
import {Endereco} from "../endereco/endereco.model";
import {JoinTable} from "typeorm/browser";

@Entity()
export class Aluno {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({
        type: 'date',
        nullable: true
    })
    dataNascimento: Date;

    @Column()
    cpf: string;

    @OneToOne(() => User, {
        createForeignKeyConstraints: true
    })
    @JoinColumn()
    usuario: User;

    @OneToOne(()=> Endereco, {
        nullable: true,
        cascade: true
    })
    @JoinColumn()
    endereco?: Endereco;

    @Column({
        nullable: true
    })
    email?: string;

    @Column({
        nullable: true
    })
    contato?: string;

    @Column()
    sexo: Sexo;

    constructor(id: number, dataNascimento: Date, nome: string,cpf: string, usuario: User, sexo: Sexo) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.usuario = usuario;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;
    }
}