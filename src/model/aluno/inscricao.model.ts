import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Bolsa} from "../bolsa/bolsa.model";
import {Documento} from "../bolsa/documento.model";
import {SituacaoBolsa} from "../../enums/situacao.bolsa";
import {Aluno} from "./aluno.model";

@Entity()
export class Inscricao {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Bolsa)
    @JoinColumn()
    bolsa: Bolsa;

    @OneToMany(() => Documento, documento => null, {
        cascade: true
    })
    documentos: Documento[]

    @Column({
        type: "timestamp"
    })
    dataCriacao: Date

    @Column()
    situacao: SituacaoBolsa

    @Column({
        nullable: true
    })
    motivoRetorno?: string

    @ManyToOne(()=> Aluno, {
        nullable: true
    })
    @JoinColumn()
    aluno?: Aluno

    constructor(
        id: number, bolsa: Bolsa, documentos: Documento[], dataCriacao: Date, situacao: SituacaoBolsa) {
        this.id = id;
        this.bolsa = bolsa;
        this.documentos = documentos;
        this.dataCriacao = dataCriacao;
        this.situacao = situacao;
    }
}