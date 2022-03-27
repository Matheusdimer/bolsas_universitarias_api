import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Documento} from "./documento.model";
import {Requisito} from "./requisito.model";
import {Edital} from "./edital.model";

@Entity()
export class Bolsa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: number;

    @Column()
    nome: string;


    requisitos: Array<Requisito>;

    documentos: Array<Documento>;

    editais: Array<Edital>;

    editalAtivo: boolean;

    constructor(id: number, descricao: number, nome: string, documentos: Array<Documento>, requisitos: Array<Requisito>, editais: Array<Edital>) {
        this.id = id;
        this.descricao = descricao;
        this.nome = nome;
        this.documentos = documentos;
        this.requisitos = requisitos;
        this.editais = editais;
        this.editalAtivo = true;
    }
}