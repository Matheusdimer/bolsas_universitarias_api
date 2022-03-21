import {User} from "../model/user.model";
import {getRepository} from "typeorm";
import {compareSync, hashSync} from "bcrypt";
import {UnnotarizedException} from "../util/exception/unnotarized.exception";
import jwt from "jsonwebtoken";
import {NotFoundException} from "../util/exception/not-found.exception";
import {ValidationException} from "../util/exception/validation.exception";
import {ForbbidenException} from "../util/exception/forbbiden.exception";

const SECRET_KEY = process.env.ENCRYPT_KEY || "xavi";
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1d"

export default class UserService {
    repository = getRepository(User);

    async find(id: number) {
        return await this.repository.findOne({ id });
    }

    async findByUsername(username: string) {
        return await this.repository.findOne({ username });
    }

    async findAll(skip: number, take: number) {
        return await this.repository.find({ skip, take });
    }

    async create(user: User) {
        const existenceUser = await this.findByUsername(user.username);

        if (existenceUser) {
            throw new ValidationException("Usuário já cadastrado.");
        }

        user.password = hashSync(user.password, 10);
        return await this.repository.save(user);
    }

    async update(id: number, user: User, userAccess: string) {
        const existenceUser = await this.find(id);

        if (!existenceUser) {
            throw new NotFoundException(`Usuário id ${id} não encontrado.`);
        }

        const existenceNewUser = await this.findByUsername(user.username);

        if (existenceNewUser) {
            throw new ValidationException("Usuário já cadastrado.");
        }

        if (userAccess !== existenceUser.username) {
            throw new ForbbidenException("Não é permitido alterar esse usuário.");
        }

        return await this.repository.save(user);
    }

    async remove(id: number, userAccess: string) {
        const existenceUser = await this.find(id);

        if (!existenceUser) {
            throw new NotFoundException(`Usuário id ${id} não encontrado.`);
        }

        if (userAccess !== existenceUser.username) {
            throw new ForbbidenException("Não é permitido remover esse usuário.");
        }

        const deleteResult = await this.repository.delete(existenceUser);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao remover usuário.");
        }

        return existenceUser;
    }

    generateToken(user: User) {
        return jwt.sign({ sub: user.username }, SECRET_KEY, {
            expiresIn: TOKEN_EXPIRATION
        });
    }

    validateToken(token: string) {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (e) {
            return null;
        }
    }

    async login(user: User): Promise<string> {
        if (!user) {
            throw new UnnotarizedException("Usuário não autorizado.");
        }

        const savedUser = await this.findByUsername(user.username);

        if (!savedUser) {
            throw new NotFoundException("Usuário não encontrado.");
        }

        const verified = compareSync(user.password, savedUser.password);

        if (!verified) {
            throw new UnnotarizedException("Usuário não autorizado.");
        }

        return this.generateToken(user);
    }
}