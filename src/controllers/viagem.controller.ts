import {Request, Response} from "express";
import {parseSkipLimit, tryParseNumber} from "../util/params.parser";
import ViagemService from "../service/viagem.service";

export default class ViagemController {
    service = new ViagemService();

    async findAll(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);
        const { viajante, orgao } = req.query

        const viajanteId = tryParseNumber(viajante, "Identificador do viajante inválido.");
        const orgaoId = tryParseNumber(orgao, "Identificador do orgão inválido.");

        return res.json(await this.service.findAll(skip, limit, viajanteId, orgaoId));
    }

    async find(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await this.service.find(id));
    }

    async create(req: Request, res: Response) {
        return res.json(await this.service.create(req.body));
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