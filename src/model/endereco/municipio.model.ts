import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Estado} from "./estado.model";

@Entity()
export class Municipio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(()=> Estado, estado => estado.municipios, {
        createForeignKeyConstraints : true,
        cascade: true
    })
    estado: Estado;

    constructor(
        id: number, nome: string, estado: Estado) {
        this.id = id;
        this.nome = nome;
        this.estado = estado;
    }
}