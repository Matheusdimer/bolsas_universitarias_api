import {Request, Response} from "express";
import {parseSkipLimit, tryParseNumber} from "../util/params.parser";
import BolsaService from '../service/bolsa.service';
import {Bolsa} from "../model/bolsa/bolsa.model";

export default class BolsaController {
    service = new BolsaService();

    async findAll(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);

        const orgaoId = tryParseNumber(req.query.orgao, "Código do órgão inválido.");

        return res.json(await this.service.findAll(skip, limit, orgaoId));
    }

    async find(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await this.service.find(id));
    }

    async create(req: Request, res: Response) {
        let bolsa : Bolsa = req.body;
        return res.json(await this.service.create(bolsa));
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