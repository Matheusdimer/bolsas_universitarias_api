import {Request, Response} from "express";
import UserService from "../service/user.service";

const userService = new UserService();

export async function authController (req: Request, res: Response) {
    const token = await userService.login(req.body);

    res.json({ token });
}