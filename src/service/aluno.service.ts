import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Aluno} from "../model/aluno/aluno.model";

export default class AlunoService {
    repository = getRepository(Aluno);

    async find(id: number) {
        const aluno = await this.repository.findOne(id, {relations: ["endereco", "usuario"]});

        if (!aluno) {
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }

        return aluno;
    }

    async findAll(skip: number, take: number, codigo?: number) {
        const where: FindConditions<Aluno> = {};
        return await this.repository.find({ skip, take, where})
    }

    async create(aluno: Aluno) {
        return await this.repository.save(aluno, {});
    }

    async update(id: number, aluno: Aluno) {
        await this.find(id);
        aluno.id = id;
        return await this.repository.save(aluno);
    }

    async remove(id: number) {
        const aluno = await this.find(id);

        const deleteResult = await this.repository.delete(aluno);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao excluir aluno.");
        }

        return aluno;
    }
}