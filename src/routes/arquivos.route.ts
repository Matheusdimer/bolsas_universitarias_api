import {Router} from "express";
import {ArquivoController} from "../controllers/arquivo.controller";

const router = Router();
const arquivoController = new ArquivoController();

router.post("/", arquivoController.create.bind(arquivoController))

router.get("/:id", arquivoController.find.bind(arquivoController))

router.get("/:id/info", arquivoController.findInfo.bind(arquivoController))

router.delete("/:id", arquivoController.remove.bind(arquivoController))

export default router;