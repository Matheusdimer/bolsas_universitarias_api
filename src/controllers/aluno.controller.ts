import {Request, Response} from "express";
import {parseSkipLimit, tryParseNumber} from "../util/params.parser";
import AlunoService from "../service/aluno.service";
import {Aluno} from "../model/aluno/aluno.model";
import {SexoTransformer} from "../enums/sexo";

export default class AlunoController {
    service = new AlunoService();

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
        let aluno : Aluno = req.body;
        aluno.sexo = SexoTransformer.to(aluno.sexo);
        return res.json(await this.service.create(aluno));
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