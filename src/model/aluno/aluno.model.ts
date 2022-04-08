import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user.model";
import {Sexo} from "../../enums/sexo";
import {Endereco} from "../endereco/endereco.model";

@Entity()
export class Aluno {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({
        type: 'timestamp'
    })
    dataNascimento: Date;

    @Column()
    cpf: string;

    @OneToOne(() => User)
    usuario: User;

    @ManyToOne(()=> Endereco, endereco => null, {
        createForeignKeyConstraints : true
    })
    endereco?: Endereco;

    @Column()
    email?: string;

    @Column()
    contato?: string;

    @Column()
    sexo: Sexo;

    constructor(
        id: number, dataNascimento: Date, nome: string,cpf: string, usuario: User, sexo: Sexo) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.usuario = usuario;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;
    }
}