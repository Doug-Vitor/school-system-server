
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
import { collectionNames } from '../domain/Constants';

export default class UserServices implements IUserServices {
    private _repository: BaseRepository<User>;

    constructor() {
        this._repository = new BaseRepository<User>(collectionNames.users);
    }

    private GetDefaultSearchPayload(username: string): IFirestoreSearchPayload {
        return {
            FieldName: "Username",
            OperatorString: FirestoreQueryOperatorsEnum.EqualsTo,
            SearchValue: username
        }
    }

    private GetResponseWithToken(userId: string): DefaultResponse<IAuthenticationInfos> {
        return new DefaultResponse({
            AuthenticatedUserId: userId,
            GeneratedToken: generateToken(userId)
        })
    }
    
    private async GetByUsername(username: string) {
        const user = (await this._repository.GetByField(this.GetDefaultSearchPayload(username), {})).data[0];
        if (user) return user;
        throw new ErrorResponse(Responses.NOT_FOUND_ERROR.StatusCode, "Não foi possível encontrar um usuário com o nome de usuário fornecido");
    }
    
    public async ValidateLogin(username: string, password: string): Promise<DefaultResponse<string> | unknown> {
        if (username && password) {
            const user = await this.GetByUsername(username);
            if (await validatePassword(password, user.Password)) return this.GetResponseWithToken(user.Id);
            this.ThrowBadRequest("Senha inválida");
        }
        else this.ThrowBadRequest("Por favor, preencha todos os campos");
    }
    
    public async CreateUser(user: User): Promise<DefaultResponse<any> | unknown> {
        try {
            if (await this._repository.EnsureExists(this.GetDefaultSearchPayload(user.Username)))
            this.ThrowBadRequest("Já existe um usuário cadastrado com o nome de usuário fornecido");
            
            user.Password = await bcrypt.hash(user.Password, 1);
            return this.GetResponseWithToken((await this._repository.Insert(user)).data.Id);
        } catch (error) { throw error }
    }

    private ThrowBadRequest(errorMessage?: string) {
        throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, errorMessage);
    }
}