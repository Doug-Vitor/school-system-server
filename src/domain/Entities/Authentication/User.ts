import BaseEntity from "../BaseEntity";
import IUser from "../../Interfaces/Entities/Authentication/IUser";

import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import { errors } from '../../Constants';

export default class User extends BaseEntity implements IUser {
    @IsNotEmpty({ message: errors.getRequiredPropertyErrorString(), })
    @IsEmail({}, { message: errors.getInvalidPropertyErrorString() })
    Email: string;

    @IsString({ message: errors.getInvalidPropertyErrorString("Nome de usuário") })
    @Length(6, 20, { message: errors.getLengthErrorString("Nome de usuário"), })
    Username: string;

    @IsNotEmpty({ message: errors.getInvalidPropertyErrorString("Senha"), })
    Password: string;

    constructor(email: string, username: string, password: string, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.Email = email;
        this.Username = username;
        this.Password = password;
    }
}