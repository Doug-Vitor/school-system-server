
import bcrypt from 'bcrypt';

import ErrorResponse from '../domain/Responses/ErrorResponse';
import Responses from "../domain/Responses/Responses";

import User from "../domain/Entities/User";
import BaseRepository from "../infrastructure/Repositories/BaseRepository";
import { validatePassword } from './AuthServices';

export default class UserServices {
    private _repository: BaseRepository<User>;

    constructor() {
        this._repository = new BaseRepository<User>("users");
    }

    private ThrowBadRequest(errorMessage?: string) {
        throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, errorMessage ?? Responses.BAD_REQUEST_ERROR.Message);
    }

    private async GetByUsernameWithoutThrow(username: string) {
        const matchedUsers = (await this._repository.GetByField("Username", username)).Data;
        if (matchedUsers && matchedUsers[0]) return matchedUsers[0];
    }

    public async GetByEmail(email: string) {
        const matchedUsers = (await this._repository.GetByField("Email", email)).Data;
        if (matchedUsers) return matchedUsers[0];
    }

    public async GetByUsername(username: string) {
        const user = await this.GetByUsernameWithoutThrow(username);
        if (user) return user;
        throw new ErrorResponse(Responses.NOT_FOUND_ERROR.StatusCode, "Não foi possível encontrar um usuário com o nome de usuário fornecido");
    }

    public async ValidateLogin(username: string, password: string) {
        const user = await this.GetByUsername(username);
        if (user && await validatePassword(password, user.Password)) return user;
        this.ThrowBadRequest("Senha inválida");
    }

    public async CreateUser(user: User) {
        if (await this.GetByUsernameWithoutThrow(user.Username)) this.ThrowBadRequest("Já existe um usuário cadastrado com o nome de usuário fornecido")
        user.Password = await bcrypt.hash(user.Password, 1);
        return await this._repository.Insert(user);
    }
}