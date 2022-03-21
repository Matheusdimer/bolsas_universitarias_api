import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Pessoa} from "./pessoa.model";
import {Orgao} from "./orgao.model";
import {SimNaoTransformer, SituacaoTransformer} from "../util/enum.transformers";

export enum Situacao {
    REALIZADA,
    NAO_REALIZADA
}

export enum SimNao {
    SIM,
    NAO
}

@Entity()
export class Viagem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Pessoa, { eager: true })
    viajante: Pessoa;

    @Column({
        type: "enum",
        transformer: SituacaoTransformer,
        enum: Situacao
    })
    situacao: Situacao;

    @Column({
        type: "enum",
        transformer: SimNaoTransformer,
        enum: SimNao
    })
    urgente: SimNao;

    @Column({
        nullable: true
    })
    justificativa_urgencia: string;

    @ManyToOne(() => Orgao, { eager: true })
    orgao: Orgao;

    @Column({
        nullable: true
    })
    destinos: string;

    @Column({
        nullable: true
    })
    motivo: string;

    @CreateDateColumn()
    data_inicio: Date

    @CreateDateColumn()
    data_fim: Date

    @Column({
        type: "double precision"
    })
    valor_passagens: number;

    @Column({
        type: "double precision"
    })
    valor_diarias: number;


    constructor(id: number, viajante: Pessoa, situacao: Situacao, urgente: SimNao, justificativa_urgencia: string, orgao: Orgao, destinos: string, motivo: string, data_inicio: Date, data_fim: Date, valor_passagens: number, valor_diarias: number) {
        this.id = id;
        this.viajante = viajante;
        this.situacao = situacao;
        this.urgente = urgente;
        this.justificativa_urgencia = justificativa_urgencia;
        this.orgao = orgao;
        this.destinos = destinos;
        this.motivo = motivo;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.valor_passagens = valor_passagens;
        this.valor_diarias = valor_diarias;
    }
}