import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Endereco} from "../model/endereco/endereco.model";
import {Municipio} from "../model/endereco/municipio.model";
import {Estado} from "../model/endereco/estado.model";

export default class EnderecoService {
    repository = getRepository(Endereco);
    municipioRepository = getRepository(Municipio);
    estadoRepository = getRepository(Estado);

    async find(id: number) {
        const endereco = await this.repository.findOne(id, {relations: ["municipio", "municipio.estado"]});
        console.log(endereco)
        if (!endereco) {
            throw new NotFoundException(`Endereco com id ${id} não encontrado.`);
        }

        return endereco;
    }

    async findMunicipios(skip: number, take: number, codigo?: number){
        const where: FindConditions<Municipio> = {
            estado: {
                id: codigo
            }
        };

        return await this.municipioRepository.find({ skip, take, where})
    }

    async findEstados(skip: number, take: number){
        const where: FindConditions<Estado> = {};

        return await this.estadoRepository.find({ skip, take, where})
    }

    async findAll(skip: number, take: number, codigo?: number) {
        const where: FindConditions<Endereco> = {};

        return await this.repository.find({ skip, take, where, relations: ["municipio", "municipio.estado"]})
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