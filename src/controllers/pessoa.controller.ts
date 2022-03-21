import {Request, Response} from "express";
import {parseSkipLimit} from "../util/params.parser";
import PessoaService from "../service/pessoa.service";

export default class PessoaController {
    service = new PessoaService();

    async findAll(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);
        return res.json(await this.service.findAll(skip, limit, <string>req.query.cpf));
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