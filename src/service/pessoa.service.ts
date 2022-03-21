import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Pessoa} from "../model/pessoa.model";

export default class PessoaService {
    repository = getRepository(Pessoa);

    async find(id: number) {
        const pessoa = await this.repository.findOne(id);

        if (!pessoa) {
            throw new NotFoundException(`Pessoa com id ${id} não encontrada.`);
        }

        return pessoa;
    }

    async findAll(skip: number, take: number, cpf?: string) {
        const where: FindConditions<Pessoa> = {};

        if (cpf) {
            where.cpf = cpf
        }

        return await this.repository.find({ skip, take, where })
    }

    async create(pessoa: Pessoa) {
        return await this.repository.save(pessoa);
    }

    async update(id: number, pessoa: Pessoa) {
        await this.find(id);
        pessoa.id = id;
        return await this.repository.save(pessoa);
    }

    async remove(id: number) {
        const pessoa = await this.find(id);

        const deleteResult = await this.repository.delete(pessoa);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao excluir pessoa.");
        }

        return pessoa;
    }
}