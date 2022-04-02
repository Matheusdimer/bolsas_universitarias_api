import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Bolsa} from "./bolsa.model";

@Entity()
export class Requisito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;

    @ManyToOne(()=> Bolsa, bolsa => bolsa.requisitos, {
        createForeignKeyConstraints : true
    })
    bolsa: Bolsa;

    constructor(id: number, descricao: string, bolsa: Bolsa) {
        this.id = id;
        this.descricao = descricao;
        this.bolsa = bolsa;
    }
}