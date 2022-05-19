import {NextFunction, Request, Response} from "express";
import {HttpException} from "../util/exception/http.exception";

export function httpErrorHandler(err: HttpException, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;

    console.log(err);
    res.status(status).json({
        status: status,
        message: err.message || "Ocorreu um erro interno." 
    });
}

export function defaultErrorHandler(err: Error, req: Request, res: Response) {
    console.log(err);

    res.status(500).json({
       status: 500,
       message: "Ocorreu um erro interno."
    });
}