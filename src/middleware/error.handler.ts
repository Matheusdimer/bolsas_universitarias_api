import {Request, Response} from "express";
import {HttpException} from "../util/exception/http.exception";

export function httpErrorHandler(err: HttpException, req: Request, res: Response) {
    const status = err.status || 500;

    res.status(status).json({
        status: status,
        message: status === 500 ? "Ocorreu um erro interno." : err.message
    });
}

export function defaultErrorHandler(err: Error, req: Request, res: Response) {
    console.log(err);

    res.status(500).json({
       status: 500,
       message: "Ocorreu um erro interno."
    });
}