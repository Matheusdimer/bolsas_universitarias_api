import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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

    constructor(id: number, nome: string, dataCriacao: Date, arquivoId: number) {
        this.id = id;
        this.nome = nome;
        this.dataCriacao = dataCriacao;
        this.arquivoId = arquivoId;
    }
}