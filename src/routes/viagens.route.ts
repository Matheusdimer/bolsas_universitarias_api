import {Router} from "express";
import authMiddleware from "../middleware/auth.middleware";
import ViagemController from "../controllers/viagem.controller";

const router = Router();
const controller = new ViagemController();

router.get("/", authMiddleware, controller.findAll.bind(controller));

router.get("/:id", authMiddleware, controller.find.bind(controller));

router.post("/", authMiddleware, controller.create.bind(controller));

router.put("/:id", authMiddleware, controller.update.bind(controller));

router.delete("/:id", authMiddleware, controller.remove.bind(controller));

export default router;