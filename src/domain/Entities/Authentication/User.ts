import BaseEntity from "../BaseEntity";
import IUser from "../../Interfaces/Entities/Authentication/IUser";

import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import { getInvalidPropertyErrorString, getLengthErrorString, getRequiredPropertyErrorString } from '../../Constants';

export default class User extends BaseEntity implements IUser {
    @IsNotEmpty({ message: getRequiredPropertyErrorString(), })
    @IsEmail({}, { message: getInvalidPropertyErrorString() })
    email: string;

    @IsString({ message: getInvalidPropertyErrorString("Nome de usuário") })
    @Length(6, 20, { message: getLengthErrorString("Nome de usuário"), })
    username: string;

    @IsNotEmpty({ message: getInvalidPropertyErrorString("Senha"), }) password: string;
    public isAdmin: boolean;

    constructor(email: string, username: string, password: string, isAdmin: boolean = false, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.email = email;
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}