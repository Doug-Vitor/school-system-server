
import bcrypt from 'bcrypt';

import User from "../domain/Entities/User";
import IUserServices from '../domain/Services/IUserServices';

import DefaultResponse from '../domain/Responses/DefaultResponse';
import ErrorResponse from '../domain/Responses/ErrorResponse';
import Responses from "../domain/Responses/Responses";

import BaseRepository from "../infrastructure/Repositories/BaseRepository";
import { generateToken, validatePassword } from './AuthServices';

export default class UserServices implements IUserServices {
    private _repository: BaseRepository<User>;

    constructor() {
        this._repository = new BaseRepository<User>("users");
    }

    private GetResponseWithToken(userId: string) {
        return new DefaultResponse({ token: generateToken(userId) });
    }

    private ThrowBadRequest(errorMessage?: string) {
        const response = Responses.BAD_REQUEST_ERROR;
        throw new ErrorResponse(response.StatusCode, errorMessage ?? response.Message);
    }

    private async GetByUsernameWithoutThrow(username: string) {
        const matchedUsers = (await this._repository.GetByField("Username", username)).Data;
        if (matchedUsers && matchedUsers[0]) return matchedUsers[0];
    }

    private async GetByUsername(username: string) {
        const user = await this.GetByUsernameWithoutThrow(username);
        if (user) return user;
        throw new ErrorResponse(Responses.NOT_FOUND_ERROR.StatusCode, "Não foi possível encontrar um usuário com o nome de usuário fornecido");
    }

    public async ValidateLogin(username: string, password: string): Promise<DefaultResponse<string> | unknown> {
        const user = await this.GetByUsername(username);
        if (await validatePassword(password, user.Password)) return this.GetResponseWithToken(user.Id);
        this.ThrowBadRequest("Senha inválida");
    }

    public async CreateUser(user: User): Promise<DefaultResponse<string> | unknown> {
        if (await this.GetByUsernameWithoutThrow(user.Username)) this.ThrowBadRequest("Já existe um usuário cadastrado com o nome de usuário fornecido");

        user.Password = await bcrypt.hash(user.Password, 1);
        const newUser = (await this._repository.Insert(user)).Data;

        if (newUser) return this.GetResponseWithToken(newUser.Id);
    }
}