import BaseEntity from "../BaseEntity";
import IUser from "../../Interfaces/Entities/Authentication/IUser";

import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import { getInvalidPropertyErrorString, getLengthErrorString, getRequiredPropertyErrorString } from '../../Constants';

export default class User extends BaseEntity implements IUser {
    @IsNotEmpty({ message: getRequiredPropertyErrorString(), })
    @IsEmail({}, { message: getInvalidPropertyErrorString() })
    Email: string;

    @IsString({ message: getInvalidPropertyErrorString("Nome de usuário") })
    @Length(6, 20, { message: getLengthErrorString("Nome de usuário"), })
    Username: string;

    @IsNotEmpty({ message: getInvalidPropertyErrorString("Senha"), }) Password: string;

    constructor(email: string, username: string, password: string, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.Email = email;
        this.Username = username;
        this.Password = password;
    }
}