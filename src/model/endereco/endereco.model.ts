import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Municipio} from "./municipio.model";

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    logradouro: string;

    @Column()
    bairro: string;

    @ManyToOne(()=> Municipio, municipio => null, {
        createForeignKeyConstraints : true
    })
    municipio: Municipio;

    @Column()
    cep: number;

    constructor(
        id: number, logradouro: string, bairro: string, municipio: Municipio, cep: number) {
        this.id = id;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.municipio = municipio;
        this.cep = cep;
    }
}