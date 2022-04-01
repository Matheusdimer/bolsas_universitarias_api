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

    @OneToMany(() => Requisito,requisito => requisito.bolsa)
    requisitos: Requisito[];

    // @ManyToOne(() => Documento, documento => null,{
    //     createForeignKeyConstraints: true
    // })
    // @JoinTable({
    //     name: "bolsa_documento",
    //     joinColumn: {
    //         name: "i_bolsas",
    //         referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //         name: "i_documentos",
    //         referencedColumnName: "id"
    //     }
    // })
    // documentos: Documento[];
    //
    // @ManyToOne(() => Edital, edital => null,{
    //     createForeignKeyConstraints: true,
    // })
    // @JoinTable({
    //     name: "bolsa_edital",
    //     joinColumn: {
    //         name: "i_bolsas",
    //         referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //         name: "i_editais",
    //         referencedColumnName: "id"
    //     }
    // })
    // editais: Edital[];
    //
    // @Column()
    // editalAtivo: boolean;

    constructor(id: number, descricao: string, nome: string, documentos: Documento[], requisitos: Requisito[], editais: Edital[]
    ) {
        this.id = id;
        this.descricao = descricao;
        this.nome = nome;
        // this.documentos = documentos;
        this.requisitos = requisitos;
        // this.editais = editais;
        // this.editalAtivo = true;
    }
}