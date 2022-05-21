import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inscricao } from "../aluno/inscricao.model";
import { Documento } from "../bolsa/documento.model";

@Entity()
export class InscricaoDocumento {

    @PrimaryGeneratedColumn()
    id?: number;
    
    @ManyToOne(() => Documento, { createForeignKeyConstraints: true })
    @JoinColumn()
    documento: Documento;

    
    @ManyToOne(() => Inscricao, inscricao => inscricao.documentos)
    @JoinColumn()
    inscricao: Inscricao;

    
    @Column()
    arquivoId: number;


    @Column()
    observacoes: string;
}