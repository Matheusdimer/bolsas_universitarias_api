import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Municipio} from "./municipio.model";
import {Aluno} from "../aluno/aluno.model";

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    logradouro: string;

    @Column()
    bairro: string;

    @OneToOne(()=> Municipio, {
        cascade: true
    })
    @JoinColumn()
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