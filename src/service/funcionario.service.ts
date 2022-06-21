import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import UserService from "./user.service";
import {Funcionario} from "../model/aluno/funcionario.model";

export default class FuncionarioService {
    repository = getRepository(Funcionario);
    userService = new UserService();

  async find(id: number) {
    let obj = await this.repository.findOne(id, {
      relations: ["usuario"],
    });

    if (!obj) {
      throw new NotFoundException(`Funcionario com id ${id} não encontrado.`);
    }

    // @ts-expect-error
    delete obj.usuario.password;
    return obj;
  }

  async findByUsername(username: string) {
    const obj = await this.repository.findOne({where: { usuario: { username } } });

    if (!obj) {

      throw new NotFoundException(
        `Funcionario com usuário ${username} não encontrado.`
      );
    }

    return obj;
  }

  async findAll(skip: number, take: number, codigo?: number) {
    const where: FindConditions<Funcionario> = {};
    return await this.repository.find({ skip, take, where, order: { nome: 'ASC' } });
  }

    async create(funcionario: Funcionario) {
        const idUsuario = funcionario.usuario?.id;
        
        if(isNaN(idUsuario)){
          funcionario.usuario = await this.userService.create(funcionario.usuario);
        }
        return await this.repository.save(funcionario);
    }

  async update(id: number, funcionario: Funcionario) {
    await this.find(id);
    funcionario.id = id;
    return await this.repository.save(funcionario);
  }

  async remove(id: number) {
    const obj = await this.find(id);

    const deleteResult = await this.repository.delete(obj);

    if (deleteResult.affected === 0) {
      throw new Error("Erro ao excluir.");
    }

    return obj;
  }
}
