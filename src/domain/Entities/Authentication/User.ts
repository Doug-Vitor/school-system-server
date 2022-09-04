import BaseEntity from "../BaseEntity";
import IUser from "../../Interfaces/Entities/Authentication/IUser";

import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import { errors } from '../../../../constants.json';

export default class User extends BaseEntity implements IUser {
    @IsNotEmpty({ message: errors["pt-br"].required, })
    @IsEmail({}, { message: errors["pt-br"].invalid })
    Email: string;

    @IsString({ message: errors["pt-br"].invalid })
    @Length(6, 20, { message: errors["pt-br"].usernameLength, })
    Username: string;

    @IsNotEmpty({ message: errors["pt-br"].requiredPassword, })
    Password: string;

    constructor(email: string, username: string, password: string, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.Email = email;
        this.Username = username;
        this.Password = password;
    }
}