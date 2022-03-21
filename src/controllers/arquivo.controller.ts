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

        await this.service.save(new Arquivo(file.name, file.data, file.mimetype));

        res.sendStatus(201);
    }

    async find(req: Request, res: Response) {
        const arquivo = await this.service.find(parseInt(req.params.id));
        res.contentType(arquivo.tipo).send(arquivo.dado);
    }

}