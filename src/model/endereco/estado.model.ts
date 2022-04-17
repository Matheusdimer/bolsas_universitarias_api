import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Municipio} from "./municipio.model";

@Entity()
export class Estado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    sigla: string;

    @OneToMany(() => Municipio,municipio => municipio.estado)
    municipios: Municipio[];

    constructor(
        id: number, sigla: string, nome: string, municipios: Municipio[]) {
        this.id = id;
        this.nome = nome;
        this.sigla = sigla;
        this.municipios = municipios;
    }
}