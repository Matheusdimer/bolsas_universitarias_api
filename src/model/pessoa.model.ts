import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Pessoa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cpf: string;

    @Column()
    nome: string;

    @Column({
        nullable: true
    })
    cargo: string;

    @Column({
        nullable: true
    })
    funcao: string;

    @Column({
        nullable: true
    })
    descricao_funcao: string;


    constructor(id: number, cpf: string, nome: string, cargo: string, funcao: string, descricao_funcao: string) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.cargo = cargo;
        this.funcao = funcao;
        this.descricao_funcao = descricao_funcao;
    }
}