
import bcrypt from 'bcrypt';

import User from "../domain/Entities/Authentication/User";
import IUserServices from '../domain/Interfaces/Services/IUserServices';

import DefaultResponse from '../domain/Responses/DefaultResponse';
import ErrorResponse from '../domain/Responses/ErrorResponse';
import Responses from "../domain/Responses/Responses";

import BaseRepository from "../infrastructure/Repositories/BaseRepository";
import FirestoreQueryOperatorsEnum from '../domain/Enums/FirestoreQueryOperatorsEnum';
import IFirestoreSearchPayload from '../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload';
import IAuthenticationInfos from '../domain/Interfaces/Responses/IAuthenticationInfos';

import { generateToken, validatePassword } from './AuthServices';
import { firebase } from '../domain/Constants';

export default class UserServices implements IUserServices {
    private _repository: BaseRepository<User>;

    constructor() {
        this._repository = new BaseRepository<User>(firebase.collectionNames.users);
    }

    private GetResponseWithToken(userId: string): DefaultResponse<IAuthenticationInfos> {
        return new DefaultResponse({
            AuthenticatedUserId: userId,
            GeneratedToken: generateToken(userId)
        })
    }

    private ThrowBadRequest(errorMessage?: string) {
        throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, errorMessage);
    }

    private async GetByUsernameWithoutThrow(username: string) {
        const searchPayload: IFirestoreSearchPayload = {
            FieldName: "Username",
            OperatorString: FirestoreQueryOperatorsEnum.EqualsTo,
            SearchValue: username
        }
        const matchedUsers = (await this._repository.GetByField(searchPayload, {})).Data;
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

    public async CreateUser(user: User): Promise<DefaultResponse<any> | unknown> {
        if (await this.GetByUsernameWithoutThrow(user.Username)) this.ThrowBadRequest("Já existe um usuário cadastrado com o nome de usuário fornecido");

        user.Password = await bcrypt.hash(user.Password, 1);
        const newUser = (await this._repository.Insert(user)).Data;

        if (newUser) return this.GetResponseWithToken(newUser.Id);
    }
}