import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Municipio} from "./municipio.model";
import {Aluno} from "../aluno/aluno.model";
import {Estado} from "./estado.model";

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    logradouro: string;

    @Column()
    bairro: string;

    @ManyToOne(() => Municipio)
    @JoinColumn()
    municipio: Municipio;

    @Column()
    cep: string;

    @Column({ nullable: true })
    complemento?: string;

    @Column({ nullable: true })
    numero?: string;

    constructor(
        id: number, logradouro: string, bairro: string, municipio: Municipio, cep: string, complemento?: string) {
        this.id = id;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.municipio = municipio;
        this.cep = cep;
        this.complemento = complemento;
    }
}