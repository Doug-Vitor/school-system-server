
import bcrypt from 'bcrypt';

import User from "../../domain/Entities/Authentication/User";
import IUserServices from '../../domain/Interfaces/Services/IUserServices';

import DefaultResponse from '../../domain/Responses/DefaultResponse';
import ErrorResponse from '../../domain/Responses/ErrorResponse';
import Responses from "../../domain/Responses/Responses";

import GenericRepository from "../../infrastructure/Repositories/GenericRepository";
import IFirestoreSearchPayload from '../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload';
import IAuthenticationInfos from '../../domain/Interfaces/Responses/IAuthenticationInfos';

import { generateToken, validatePassword } from './AuthServices';
import { collectionNames } from '../../domain/Constants';

export default class UserServices implements IUserServices {
    private _repository: GenericRepository<User>;

    constructor() {
        this._repository = new GenericRepository<User>(collectionNames.users);
    }

    private GetDefaultSearchPayload(username: string): IFirestoreSearchPayload {
        return {
            FieldName: "username",
            OperatorString: "==",
            SearchValue: username
        }
    }

    private GetResponseWithToken(userId: string, isAdmin: boolean): DefaultResponse<IAuthenticationInfos> {
        const token = generateToken({ UserId: userId, IsAdmin: isAdmin });
        
        return new DefaultResponse({
            authenticatedUserId: userId,
            isAdmin,
            generatedToken: token.generatedToken,
            expirationDate: token.expirationDate
        });
    }

    private async GetByUsername(username: string) {
        const user = (await this._repository.GetFirst(this.GetDefaultSearchPayload(username))).data;
        if (user) return user;
        throw new ErrorResponse(Responses.NOT_FOUND_ERROR.StatusCode, "Não foi possível encontrar um usuário com o nome de usuário fornecido");
    }

    public async ValidateLogin(username: string, password: string): Promise<DefaultResponse<string> | unknown> {
        if (username && password) {
            const user = await this.GetByUsername(username);
            if (await validatePassword(password, user.password)) return this.GetResponseWithToken(user.id, user.isAdmin);
            this.ThrowBadRequest("Senha inválida");
        }
        else this.ThrowBadRequest("Por favor, preencha todos os campos");
    }

    public async CreateUser(user: User): Promise<DefaultResponse<any> | unknown> {
        try {
            if ((await this._repository.GetFirst(this.GetDefaultSearchPayload(user.username))).data.id)
                this.ThrowBadRequest("Já existe um usuário cadastrado com o nome de usuário fornecido");

            user.password = await bcrypt.hash(user.password, 1);

            const newUser = (await this._repository.Insert(user)).data;
            return this.GetResponseWithToken(newUser.id, newUser.isAdmin);
        } catch (error) { throw error }
    }

    private ThrowBadRequest(errorMessage?: string) {
        throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, errorMessage);
    }
}