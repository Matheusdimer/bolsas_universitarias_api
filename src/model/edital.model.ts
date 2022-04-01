import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Bolsa} from "./bolsa.model";

@Entity()
export class Edital {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;

    @Column()
    arquivoId: number;

    @Column({
        type: 'timestamp'
    })
    dataInicio: Date;

    @Column({
        type: 'timestamp'
    })
    dataFim: Date;

    @Column({
        type: 'timestamp'
    })
    dataResultado: Date;

    @ManyToOne(()=> Bolsa,{
        createForeignKeyConstraints : true
    })
    bolsa: Bolsa;

    constructor(id: number, descricao: string, arquivoId: number, dataInicio: Date, dataFim: Date, dataResultado: Date, bolsa: Bolsa) {
        this.id = id;
        this.descricao = descricao;
        this.arquivoId = arquivoId;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.dataResultado = dataResultado;
        this.bolsa = bolsa;
    }
}