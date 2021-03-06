import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Inscricao} from "../model/aluno/inscricao.model";
import { InscricaoDocumento } from "../model/inscricao/inscricao-documento.model";

export default class InscricaoService {
    repository = getRepository(Inscricao);
    inscricaoDocumentoRepository = getRepository(InscricaoDocumento);

    async find(id: number) {
        const inscricao = await this.repository.findOne(id, {
            relations: [
                "documentos",
                "documentos.documento", 
                "bolsa", 
                "aluno",
                "aluno.endereco",
                "aluno.endereco.municipio",
                "aluno.endereco.municipio.estado"
            ]
        });

        if (!inscricao) {
            throw new NotFoundException(`Inscricao com id ${id} não encontrado.`);
        }

        return inscricao;
    }

    async findAll(skip: number, take: number, idAluno?: number) {
        const where: FindConditions<Inscricao> = {};

        if (idAluno) {
            where.aluno = { id: idAluno };
        }

        return await this.repository.find({ 
            skip,
            take,
            where,
            relations: ['aluno', 'bolsa'],
            order: {
                dataCriacao: 'DESC'
            }
        });
    }

    async create(inscricao: Inscricao) {
        const inscricaoSaved = await this.repository.save(inscricao);

        inscricao.documentos.forEach(async (inscricaoDocumento, index) => {
            inscricaoDocumento.inscricao = inscricaoSaved;
            const documentoSaved = await this.inscricaoDocumentoRepository
                .save(inscricaoDocumento);
            
            delete documentoSaved.inscricao;
            inscricaoSaved.documentos[index] = documentoSaved;
        });

        inscricaoSaved.documentos = []

        return inscricaoSaved;
    }

    async update(id: number, inscricao: Inscricao) {
        await this.find(id);
        
        const inscricaoSaved = await this.repository.save(inscricao);

        inscricao.documentos.forEach(async (inscricaoDocumento, index) => {
            inscricaoDocumento.inscricao = inscricaoSaved;
            const documentoSaved = await this.inscricaoDocumentoRepository
                .save(inscricaoDocumento);
            
            delete documentoSaved.inscricao;
            inscricaoSaved.documentos[index] = documentoSaved;
        });

        inscricaoSaved.documentos = []

        return inscricaoSaved;
    }

    async remove(id: number) {
        const inscricao = await this.find(id);

        const deleteResult = await this.repository.delete(inscricao);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao excluir inscricao.");
        }

        return inscricao;
    }
}