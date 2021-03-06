import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Bolsa} from "./bolsa.model";

@Entity()
export class Edital {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;

    @Column({ nullable: true })
    arquivoId?: number;

    @Column({
        type: 'date'
    })
    dataInicio: Date;

    @Column({
        type: 'date'
    })
    dataFim: Date;

    @Column({
        type: 'date',
        nullable: true
    })
    dataResultado?: Date;

    @ManyToOne(()=> Bolsa, bolsa => bolsa.editais, {
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