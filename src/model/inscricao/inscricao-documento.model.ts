import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inscricao } from "../aluno/inscricao.model";
import { Documento } from "../bolsa/documento.model";

@Entity()
export class InscricaoDocumento {

    @PrimaryGeneratedColumn()
    id?: number;
    
    @ManyToOne(() => Documento, {
        createForeignKeyConstraints: true,
    })
    @JoinColumn()
    documento?: Documento;

    
    @ManyToOne(() => Inscricao, inscricao => inscricao.documentos, {
        createForeignKeyConstraints : true,
    })
    inscricao?: Inscricao;

    
    @Column({
        nullable: true
    })
    arquivoId?: number;


    @Column({ nullable: true })
    observacoes?: string;

    constructor(
        id: number,
        documento: Documento,
        inscricao: Inscricao,
        arquivoId: number,
        observacoes: string
    ) {
        this.id = id;
        this.documento = documento;
        this.inscricao = inscricao;
        this.arquivoId = arquivoId;
        this.observacoes = observacoes
    }
}