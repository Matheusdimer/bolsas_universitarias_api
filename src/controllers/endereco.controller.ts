import {Request, Response} from "express";
import {parseSkipLimit, tryParseNumber} from "../util/params.parser";
import {Endereco} from "../model/endereco/endereco.model";
import EnderecoService from "../service/endereco.service";

export default class EnderecoController {
    service = new EnderecoService();

    async findAll(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);

        const orgaoId = tryParseNumber(req.query.orgao, "Código do órgão inválido.");

        return res.json(await this.service.findAll(skip, limit, orgaoId));
    }

    async find(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await this.service.find(id));
    }

    async findEstados(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);

        return res.json(await this.service.findEstados(skip, limit));
    }

    async findMunicipios(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);

        const estadoId = tryParseNumber(req.query.orgao, "Estado invalido.");

        return res.json(await this.service.findMunicipios(skip, limit, estadoId));
    }

    async create(req: Request, res: Response) {
        let endereco : Endereco = req.body;
        return res.json(await this.service.create(endereco));
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await this.service.update(id, req.body));
    }

    async remove(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await this.service.remove(id));
    }
}