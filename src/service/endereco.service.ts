import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Endereco} from "../model/endereco/endereco.model";

export default class EnderecoService {
    repository = getRepository(Endereco);

    async find(id: number) {
        const endereco = await this.repository.findOne(id, {relations: ["requisitos", "editais", "documentos"]});
        console.log(endereco)
        if (!endereco) {
            throw new NotFoundException(`Endereco com id ${id} não encontrado.`);
        }

        return endereco;
    }

    async findAll(skip: number, take: number, codigo?: number) {
        const where: FindConditions<Endereco> = {};

        return await this.repository.find({ skip, take, where})
    }

    async create(endereco: Endereco) {
        return await this.repository.save(endereco);
    }

    async update(id: number, endereco: Endereco) {
        await this.find(id);
        endereco.id = id;
        return await this.repository.save(endereco);
    }

    async remove(id: number) {
        const endereco = await this.find(id);

        const deleteResult = await this.repository.delete(endereco);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao excluir endereco.");
        }

        return endereco;
    }
}