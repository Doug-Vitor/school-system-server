
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
import Teacher from '../../domain/Entities/Person/Teacher';

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

    private async GetResponseWithToken(userId: string, username: string, isAdmin: boolean): Promise<DefaultResponse<IAuthenticationInfos>> {
        const token = generateToken({ UserId: userId, IsAdmin: isAdmin });
        
        return new DefaultResponse({
            authenticatedUserId: userId,
            authenticatedUsername: username,
            ownsTeacherProfile: await this.EnsureUserHasProfile(userId),
            isAdmin,
            token: {
                generatedToken: token.generatedToken,
                expirationDate: token.expirationDate
            }
        });
    }

    private async EnsureUserHasProfile(userId: string) {
        return (await new GenericRepository<Teacher>(collectionNames.teachers).GetFirst({
            FieldName: "userId",
            OperatorString: "==",
            SearchValue: userId
        })).data.id ? true : false;
    }

    private async GetByUsername(username: string) {
        const user = (await this._repository.GetFirst(this.GetDefaultSearchPayload(username))).data;
        if (user) return user;
        throw new ErrorResponse(Responses.NOT_FOUND_ERROR.StatusCode, "Não foi possível encontrar um usuário com o nome de usuário fornecido");
    }

    public async ValidateLogin(username: string, password: string): Promise<DefaultResponse<string> | unknown> {
        if (username && password) {
            const user = await this.GetByUsername(username);
            if (await validatePassword(password, user.password)) return await this.GetResponseWithToken(user.id, user.username, user.isAdmin);
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
            return await this.GetResponseWithToken(newUser.id, newUser.username, newUser.isAdmin);
        } catch (error) { throw error }
    }

    private ThrowBadRequest(errorMessage?: string) {
        throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, errorMessage);
    }
}