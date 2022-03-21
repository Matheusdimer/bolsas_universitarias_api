import {HttpException} from "./http.exception";

export class ForbbidenException extends HttpException {
    constructor(message: string) {
        super(message, 403);
    }
}