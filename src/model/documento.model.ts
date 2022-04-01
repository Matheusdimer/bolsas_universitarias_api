import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Bolsa} from "./bolsa.model";

@Entity()
export class Documento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({
        type: 'timestamp'
    })
    dataCriacao: Date;

    @Column({
        nullable: true
    })
    arquivoId: number

    @ManyToOne(()=> Bolsa,{
        createForeignKeyConstraints : true
    })
    bolsa: Bolsa;

    constructor(id: number, nome: string, dataCriacao: Date, arquivoId: number, bolsa: Bolsa) {
        this.id = id;
        this.nome = nome;
        this.dataCriacao = dataCriacao;
        this.arquivoId = arquivoId;
        this.bolsa = bolsa;
    }
}