import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Bolsa} from "./bolsa.model";

@Entity()
export class Requisito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;


    constructor(id: number, descricao: string) {
        this.id = id;
        this.descricao = descricao;
    }
}