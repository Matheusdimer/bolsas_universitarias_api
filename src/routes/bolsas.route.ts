import {Router} from "express";
import authMiddleware from "../middleware/auth.middleware";
import BolsaController from "../controllers/bolsa.controller";

const router = Router();
const controller = new BolsaController();

router.get("/", authMiddleware, controller.findAll.bind(controller));

router.get("/:id", authMiddleware, controller.find.bind(controller));

router.post("/", authMiddleware, controller.create.bind(controller));

router.put("/:id", authMiddleware, controller.update.bind(controller));

router.delete("/:id", authMiddleware, controller.remove.bind(controller));

router.delete("/:id/editais/:idEdital", authMiddleware, controller.removeEdital.bind(controller));

export default router;