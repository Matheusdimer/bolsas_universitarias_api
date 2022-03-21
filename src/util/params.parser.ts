import {Request} from "express";
import {UnnotarizedException} from "./exception/unnotarized.exception";
import {BadRequestException} from "./exception/bad-request.exception";

export function parseSkipLimit(request: Request) {
    const page = tryParseNumber(request.query.page, "Parâmetro page inválido.");
    const limit = tryParseNumber(request.query.limit, "Parâmetro limit inválido.");

    const limitNumber = limit || 20;
    const skip = (page || 0) * limitNumber

    return {
        skip: skip,
        limit: limitNumber
    }
}

export function getUserAccess(request: Request): string {
    const userAccess = request.query.userAccess;

    if (!userAccess) {
        throw new UnnotarizedException("Sem autorização.");
    }

    return <string> userAccess;
}

export function tryParseNumber(string: any, errorMessage: string) {
    if (string) {
        try {
            return parseInt(string);
        } catch (e) {
            throw new BadRequestException(errorMessage);
        }
    }

    return undefined;
}