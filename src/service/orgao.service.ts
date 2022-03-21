import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Orgao} from "../model/orgao.model";

export default class OrgaoService {
    repository = getRepository(Orgao);

    async find(id: number) {
        const orgao = await this.repository.findOne(id);

        if (!orgao) {
            throw new NotFoundException(`Orgão com id ${id} não encontrado.`);
        }

        return orgao;
    }

    async findAll(skip: number, take: number, codigo?: number) {
        const where: FindConditions<Orgao> = {};

        if (codigo) {
            where.codigo = codigo;
        }

        return await this.repository.find({ skip, take, where })
    }

    async create(orgao: Orgao) {
        return await this.repository.save(orgao);
    }

    async update(id: number, orgao: Orgao) {
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