import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Orgao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: number;

    @Column()
    nome: string

    constructor(id: number, codigo: number, nome: string) {
        this.id = id;
        this.codigo = codigo;
        this.nome = nome;
    }
}