import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Bolsa} from "./bolsa.model";
import {Inscricao} from "../aluno/inscricao.model";

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

    @ManyToOne(() => Bolsa, bolsa => bolsa.documentos, {
        createForeignKeyConstraints : true,
        nullable: true,
    })
    bolsa?: Bolsa;

    @ManyToOne(() => Inscricao, inscricao => inscricao.documentos, {
        createForeignKeyConstraints : true,
        nullable: true,
    })
    inscricao?: Inscricao;

    constructor(id: number, nome: string, dataCriacao: Date, arquivoId: number, bolsa: Bolsa, inscricao: Inscricao) {
        this.id = id;
        this.nome = nome;
        this.dataCriacao = dataCriacao;
        this.arquivoId = arquivoId;
        this.bolsa = bolsa;
        this.inscricao = inscricao;
    }
}