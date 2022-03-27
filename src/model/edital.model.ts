import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Edital {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;

    @Column()
    arquivoId: number;

    @Column()
    dataInicio: Date;

    @Column()
    dataFim: Date;

    @Column()
    dataResultado: Date;

    constructor(id: number, descricao: string, arquivoId: number, dataInicio: Date, dataFim: Date, dataResultado: Date) {
        this.id = id;
        this.descricao = descricao;
        this.arquivoId = arquivoId;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.dataResultado = dataResultado;
    }
}