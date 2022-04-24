import {Request, Response} from "express";
import {BadRequestException} from "../util/exception/bad-request.exception";
import fileUpload from "express-fileupload";
import {ArquivoService} from "../service/arquivo.service";
import {Arquivo} from "../model/arquivo.model";

export class ArquivoController {

    private service = new ArquivoService();

    async create(req: Request, res: Response) {
        const file = req.files?.file as fileUpload.UploadedFile | undefined;

        if (!file) {
            throw new BadRequestException('Nenhum arquivo recebido.');
        }

        const arquivo = await this.service.save(new Arquivo(file.name, file.data, file.mimetype));

        delete arquivo.dado;

        res.status(201).send(arquivo);
    }

    async find(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const arquivo = await this.service.find(id);
        res.contentType(arquivo.tipo).send(arquivo.dado);
    }

    async findInfo(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        res.json(await this.service.findOnlyInfo(id));
    }

    async remove(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        res.json(await this.service.remove(id));
    }

}