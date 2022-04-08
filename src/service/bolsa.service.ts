import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Bolsa} from "../model/bolsa/bolsa.model";

export default class BolsaService {
    repository = getRepository(Bolsa);

    async find(id: number) {
        const bolsa = await this.repository.findOne(id, {relations: ["requisitos", "editais", "documentos"]});

        if (!bolsa) {
            throw new NotFoundException(`Bolsa com id ${id} não encontrado.`);
        }

        return bolsa;
    }

    async findAll(skip: number, take: number, codigo?: number) {
        const where: FindConditions<Bolsa> = {};

        return await this.repository.find({ skip, take, where})
    }

    async create(bolsa: Bolsa) {
        return await this.repository.save(bolsa);
    }

    async update(id: number, bolsa: Bolsa) {
        await this.find(id);
        bolsa.id = id;
        return await this.repository.save(bolsa);
    }

    async remove(id: number) {
        const bolsa = await this.find(id);

        const deleteResult = await this.repository.delete(bolsa);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao excluir bolsa.");
        }

        return bolsa;
    }
}