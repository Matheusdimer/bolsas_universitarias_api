import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Bolsa} from "../model/bolsa.model";

export default class BolsaService {
    repository = getRepository(Bolsa);

    async find(id: number) {
        const bolsa = await this.repository.findOne(id);

        if (!bolsa) {
            throw new NotFoundException(`Orgão com id ${id} não encontrado.`);
        }

        return bolsa;
    }

    async findAll(skip: number, take: number, codigo?: number) {
        const where: FindConditions<Bolsa> = {};

        return await this.repository.find({ skip, take, where, relations: ["requisitos", "editais", "documentos"]})
    }

    async create(orgao: Bolsa) {
        return await this.repository.save(orgao);
    }

    async update(id: number, orgao: Bolsa) {
        await this.find(id);
        orgao.id = id;
        return await this.repository.save(orgao);
    }

    async remove(id: number) {
        const orgao = await this.find(id);

        const deleteResult = await this.repository.delete(orgao);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao excluir orgão.");
        }

        return orgao;
    }
}