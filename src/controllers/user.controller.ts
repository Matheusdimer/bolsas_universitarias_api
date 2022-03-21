import {Request, Response} from "express";
import {getUserAccess, parseSkipLimit} from "../util/params.parser";
import UserService from "../service/user.service";

export default class UserController {
    service = new UserService();

    async findAll(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);
        return res.json(await this.service.findAll(skip, limit));
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
        return res.json(await this.service.update(id, req.body, getUserAccess(req)));
    }

    async remove(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await this.service.remove(id,getUserAccess(req)));
    }
}