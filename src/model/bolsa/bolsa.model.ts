import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Documento} from "./documento.model";
import {Requisito} from "./requisito.model";
import {Edital} from "./edital.model";
import {TipoBolsa} from "../../enums/tipo.bolsa";
import {TipoInscricao} from "../../enums/tipo.inscricao";

@Entity()
export class Bolsa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;

    @Column()
    nome: string;

    @OneToMany(() => Requisito,requisito => requisito.bolsa, {
        cascade: true
    })
    requisitos: Requisito[];

    @OneToMany(() => Documento, documento => documento.bolsa, {
        cascade: true
    })
    documentos: Documento[];

    @OneToMany(() => Edital, edital => edital.bolsa, {
        cascade: true
    })
    editais: Edital[];

    @Column({
        nullable:true
    } )
    editalAtivo: boolean;

    @Column({
        nullable: true
    })
    fotoId: number;

    @Column()
    tipoBolsa: TipoBolsa;

    @Column({
        default:TipoInscricao.INTERNA
    })
    tipoInscricao: TipoInscricao;

    @Column({
        nullable:true
    })
    url?: string;

    constructor(
        id: number,
        descricao: string,
        nome: string,
        documentos: Documento[],
        requisitos: Requisito[],
        editais: Edital[],
        fotoId: number,
        tipoBolsa: TipoBolsa,
        tipoInscricao: TipoInscricao,
        url: string
    ) {
        this.id = id;
        this.descricao = descricao;
        this.nome = nome;
        this.documentos = documentos;
        this.requisitos = requisitos;
        this.editais = editais;
        this.fotoId = fotoId;
        this.editalAtivo = true;
        this.tipoBolsa = tipoBolsa;
        this.tipoInscricao = tipoInscricao;
        this.url = url;
    }
}