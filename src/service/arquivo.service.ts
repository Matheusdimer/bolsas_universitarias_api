import {getRepository, Repository} from "typeorm";
import {Arquivo} from "../model/arquivo.model";
import {NotFoundException} from "../util/exception/not-found.exception";

export class ArquivoService {

    private repository: Repository<Arquivo> = getRepository(Arquivo);

    async save(arquivo: Arquivo) {
        return await this.repository.save(arquivo);
    }

    async find(id: number): Promise<Arquivo> {
        const arquivo = await this.repository.findOne({ id });

        if (!arquivo) {
            throw new NotFoundException(`Arquivo id ${id} não encontrado.`);
        }

        return arquivo;
    }
}