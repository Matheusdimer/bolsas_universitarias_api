import {Request, Response} from "express";
import {parseSkipLimit} from "../util/params.parser";
import { NotFoundException } from "../util/exception/not-found.exception";
import {Funcionario} from "../model/aluno/funcionario.model";
import FuncionarioService from "../service/funcionario.service";

export default class FuncionarioController {
    service = new FuncionarioService();

    async findAll(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);
        return res.json(await this.service.findAll(skip, limit));
    }

    async find(req: Request, res: Response) {
        if (req.params.id === 'me') {
            await this.findMe(req, res);
            return;
        }

        const id = parseInt(req.params.id);
        res.json(await this.service.find(id));
    }

    async findMe(req: Request, res: Response) {
        const user = req.query.userAccess;

        if (!user) {
            throw new NotFoundException('Funcionario não encontrado.');
        }

        res.json(await this.service.findByUsername(user as string));
    }

    async create(req: Request, res: Response) {
        let obj : Funcionario = req.body;
        return res.json(await this.service.create(obj));
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