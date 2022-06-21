import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Aluno} from "../model/aluno/aluno.model";
import UserService from "./user.service";
import { Endereco } from "../model/endereco/endereco.model";

export default class AlunoService {
    repository = getRepository(Aluno);
    enderecoRepo = getRepository(Endereco);
    userService = new UserService();

  async find(id: number) {
    let obj = await this.repository.findOne(id, {
      relations: ["usuario", "endereco"],
    });

    if (!obj) {
      throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
    }

    // @ts-expect-error
    delete obj.usuario.password;
    return obj;
  }

  async findByUsername(username: string) {
    const aluno = await this.repository.findOne({ relations: ['usuario','endereco', 'endereco.municipio', 'endereco.municipio.estado'], where: { usuario: { username } } });

    if (!aluno) {

      throw new NotFoundException(
        `Aluno com usuário ${username} não encontrado.`
      );
    }

    return aluno;
  }

  async findAll(skip: number, take: number, codigo?: number) {
    const where: FindConditions<Aluno> = {};
    return await this.repository.find({ skip, take, where, order: { nome: 'ASC' } });
  }

  async create(aluno: Aluno) {
      await this.userService.create(aluno.usuario);
      return await this.repository.save(aluno, {});
  }

  async update(id: number, aluno: Aluno) {
    await this.find(id);
    aluno.id = id;

    if (aluno.endereco) {
      const endereco = await this.enderecoRepo.save(aluno.endereco);
      aluno.endereco = endereco;
    }

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
