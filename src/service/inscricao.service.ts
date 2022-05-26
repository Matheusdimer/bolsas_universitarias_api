import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Inscricao} from "../model/aluno/inscricao.model";

export default class InscricaoService {
    repository = getRepository(Inscricao);

    async find(id: number) {
        const inscricao = await this.repository.findOne(id, {relations: ["documentos", "bolsa", "aluno"]});
        console.log(inscricao)
        if (!inscricao) {
            throw new NotFoundException(`Inscricao com id ${id} não encontrado.`);
        }

        return inscricao;
    }

    async findAll(skip: number, take: number, codigo?: number) {
        const where: FindConditions<Inscricao> = {};

        return await this.repository.find({ skip, take, where, relations: ['aluno', 'bolsa']})
    }

    async create(inscricao: Inscricao) {
        return await this.repository.save(inscricao);
    }

    async update(id: number, inscricao: Inscricao) {
        await this.find(id);
        inscricao.id = id;
        return await this.repository.save(inscricao);
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