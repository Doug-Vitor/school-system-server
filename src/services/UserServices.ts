
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

    public async GetByEmail(email: string) {
        const matchedUsers = (await this._repository.GetByField("Email", email)).Data;
        if (matchedUsers) return matchedUsers[0];
    }

    public async GetByUsername(username: string) {
        const matchedUsers = (await this._repository.GetByField("Username", username)).Data;
        if (matchedUsers) return matchedUsers[0];
    }

    public async CreateUser(user: User) {
        if (await this.GetByUsername(user.Username)) throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, "Já existe um usuário cadastrado com o nome de usuário fornecido");
        
        user.Password = await bcrypt.hash(user.Password, 1);
        return await this._repository.Insert(user);
    }
}