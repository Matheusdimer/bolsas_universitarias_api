import {Request, Response} from "express";
import {parseSkipLimit, tryParseNumber} from "../util/params.parser";
import InscricaoService from "../service/inscricao.service";
import {Inscricao} from "../model/aluno/inscricao.model";

export default class InscricaoController {
    service = new InscricaoService();

    async findAll(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);
        let idAluno: number | undefined;
        
        if (req.query.idAluno) {
            idAluno = tryParseNumber(req.query.idAluno, 'Id do aluno inválido');
        }

        return res.json(await this.service.findAll(skip, limit, idAluno));
    }

    async find(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await this.service.find(id));
    }

    async create(req: Request, res: Response) {
        let inscricao : Inscricao = req.body;
        return res.json(await this.service.create(inscricao));
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