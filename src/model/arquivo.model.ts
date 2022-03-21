import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Arquivo {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome: string;

    @Column({
        length: 5
    })
    extensao?: string;

    @Column({
        type: 'bytea'
    })
    dado: Uint8Array;

    @Column({
        type: 'timestamp'
    })
    criadoEm: Date;

    @Column()
    tipo: string

    constructor(nome: string, dado: Uint8Array, tipo: string) {
        const split = nome?.split('.');
        this.nome = nome;
        this.extensao = split ? split[split.length - 1] : undefined;
        this.dado = dado;
        this.criadoEm = new Date();
        this.tipo = tipo;
    }
}