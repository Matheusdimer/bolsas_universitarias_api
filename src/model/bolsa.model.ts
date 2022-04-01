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

    @ManyToOne(() => Requisito, requisito => null,{
        createForeignKeyConstraints: true
    })
    @JoinTable({
        name: "bolsa_requisito",
        joinColumn: {
            name: "i_bolsas",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "i_requisitos",
            referencedColumnName: "id"
        }
    })
    requisitos: Requisito[];
    //
    // @Column({
    //     type: 'bigint',
    //     name: 'i_documentos'
    // })
    documentos: Array<Documento>;
    //
    // @Column({
    //     type: 'bigint',
    //     name: 'i_editais'
    // })
    editais: Array<Edital>;

    @Column()
    editalAtivo: boolean;

    constructor(id: number, descricao: string, nome: string, documentos: Array<Documento>, requisitos: Requisito[], editais: Array<Edital>
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