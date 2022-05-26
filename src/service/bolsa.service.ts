import { FindConditions, getRepository } from "typeorm";
import { NotFoundException } from "../util/exception/not-found.exception";
import { Bolsa } from "../model/bolsa/bolsa.model";
import { Edital } from "../model/bolsa/edital.model";

export default class BolsaService {
  repository = getRepository(Bolsa);
  editalRepository = getRepository(Edital);

  async find(id: number) {
    const bolsa = await this.repository.findOne(id, {
      relations: ["requisitos", "editais", "documentos"],
    });

    if (!bolsa) {
      throw new NotFoundException(`Bolsa com id ${id} não encontrada.`);
    }

    this.verifyEditalAtivo(bolsa);

    return bolsa;
  }

  async findAll(skip: number, take: number) {
    const where: FindConditions<Bolsa> = {};

    const bolsas = await this.repository.find({ skip, take, where, relations: ['editais'] });
    bolsas.forEach(this.verifyEditalAtivo);

    return bolsas;
  }

  verifyEditalAtivo(bolsa: Bolsa) {
    bolsa.editalAtivo = bolsa.editais.some((edital) => {
        const now = new Date(new Date().toUTCString()).getTime();

        return new Date(edital.dataInicio).getTime() <= now && now <= new Date(edital.dataFim).getTime();
    });
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

  async removeEdital(id: number) {
    const edital = await this.editalRepository.findOne(id);

    if (!edital) {
      throw new NotFoundException('Edital não encontrado.');
    }

    const deleteResult = await this.editalRepository.delete(edital.id);

    if (deleteResult.affected === 0) {
      throw new Error("Erro ao excluir edital.");
    }

    return edital;
  }
}
