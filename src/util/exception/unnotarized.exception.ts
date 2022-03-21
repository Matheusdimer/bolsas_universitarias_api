import {HttpException} from "./http.exception";

export class UnnotarizedException extends HttpException {
    constructor(message: string) {
        super(message, 401);
    }
}