import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Estado} from "./estado.model";

@Entity()
export class Municipio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    sigla: string;


    @ManyToOne(()=> Estado, estado => estado.municipios, {
        createForeignKeyConstraints : true
    })
    estado: Estado;

    constructor(
        id: number, sigla: string, nome: string, estado: Estado) {
        this.id = id;
        this.nome = nome;
        this.sigla = sigla;
        this.estado = estado;
    }
}