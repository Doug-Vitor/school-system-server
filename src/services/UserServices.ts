
import bcrypt from 'bcrypt';

import User from "../domain/Entities/User";

import ErrorResponse from '../domain/Responses/ErrorResponse';
import Responses from "../domain/Responses/Responses";

import BaseRepository from "../infrastructure/Repositories/BaseRepository";

export default class UserServices {
    private _repository: BaseRepository<User>;

    constructor() {
        this._repository = new BaseRepository<User>("users");
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

    public async CreateUser(user: User) {
        if (await this.GetByUsernameWithoutThrow(user.Username)) throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, "Já existe um usuário cadastrado com o nome de usuário fornecido");
        
        console.log('1')
        user.Password = await bcrypt.hash(user.Password, 1);
        return await this._repository.Insert(user);
    }
}