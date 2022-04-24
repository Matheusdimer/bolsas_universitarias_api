import { getRepository, Repository } from "typeorm";
import { Arquivo } from "../model/arquivo.model";
import { NotFoundException } from "../util/exception/not-found.exception";

export class ArquivoService {
  private repository: Repository<Arquivo> = getRepository(Arquivo);

  async save(arquivo: Arquivo) {
    return await this.repository.save(arquivo);
  }

  async find(id: number): Promise<Arquivo> {
    const arquivo = await this.repository.findOne(id);

    if (!arquivo) {
      throw new NotFoundException(`Arquivo id ${id} não encontrado.`);
    }

    return arquivo;
  }

  async findOnlyInfo(id: number) {
    const arquivo = await this.repository.findOne(id, {
      select: ["id", "nome", "tipo", "extensao", "criadoEm"],
    });

    if (!arquivo) {
      throw new NotFoundException(`Arquivo id ${id} não encontrado.`);
    }

    return arquivo;
  }

  async remove(id: number): Promise<Arquivo> {
    const arquivo = await this.findOnlyInfo(id);

    const deleteResult = await this.repository.delete(id);

    if (deleteResult.affected === 0) {
      throw new Error("Erro ao excluir arquivo.");
    }

    return arquivo;
  }
}
