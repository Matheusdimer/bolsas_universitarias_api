import {Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Documento} from "./documento.model";
import {Requisito} from "./requisito.model";
import {Edital} from "./edital.model";

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

    constructor(id: number, descricao: string, nome: string, documentos: Documento[], requisitos: Requisito[], editais: Edital[]
    ) {
        this.id = id;
        this.descricao = descricao;
        this.nome = nome;
        this.documentos = documentos;
        this.requisitos = requisitos;
        this.editais = editais;
        this.editalAtivo = true;
    }
}