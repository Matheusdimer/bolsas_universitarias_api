import {Router} from "express";
import authMiddleware from "../middleware/auth.middleware";
import UserController from "../controllers/user.controller";

const router = Router();
const controller = new UserController();

router.get("/", authMiddleware, controller.findAll);

router.get("/:id", authMiddleware, controller.find);

router.post("/", controller.create);

router.put("/:id", authMiddleware, controller.update);

router.delete("/:id", authMiddleware, controller.remove);

export default router;