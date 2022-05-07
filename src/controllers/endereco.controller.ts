import {Request, Response} from "express";
import {parseSkipLimit, tryParseNumber} from "../util/params.parser";
import {Endereco} from "../model/endereco/endereco.model";
import EnderecoService from "../service/endereco.service";

export default class EnderecoController {
    service = new EnderecoService();

    async findAll(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);
        return res.json(await this.service.findAll(skip, limit));
    }

    async find(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await this.service.find(id));
    }

    async findEstados(req: Request, res: Response) {
        return res.json(await this.service.findEstados());
    }

    async findMunicipios(req: Request, res: Response) {
        const estadoId = tryParseNumber(req.params.id, "Estado invalido.");
        const nome = req.query.nome ? (req.query.nome).toString() : undefined;

        return res.json(await this.service.findMunicipios(estadoId, nome));
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