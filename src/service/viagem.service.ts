import {FindConditions, getRepository} from "typeorm";
import {Viagem} from "../model/viagem.model";
import {NotFoundException} from "../util/exception/not-found.exception";

export default class ViagemService {
    repository = getRepository(Viagem);

    async find(id: number) {
        const viagem = await this.repository.findOne(id);

        if (!viagem) {
            throw new NotFoundException(`Viagem com id ${id} não encontrada.`);
        }

        return viagem;
    }

    async findAll(skip: number, take: number, viajanteId?: number, orgaoId?: number) {
        const where: FindConditions<Viagem> = {};

        if (viajanteId) {
            where.viajante = { id: viajanteId }
        }

        if (orgaoId) {
            where.orgao = { id: orgaoId }
        }

        return await this.repository.find({ skip, take, where })
    }

    async create(viagem: Viagem) {
        return await this.repository.save(viagem);
    }

    async update(id: number, viagem: Viagem) {
        await this.find(id);
        viagem.id = id;
        return await this.repository.save(viagem);
    }

    async remove(id: number) {
        const viagem = await this.find(id);

        const deleteResult = await this.repository.delete(viagem);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao excluir viagem.");
        }

        return viagem;
    }
}