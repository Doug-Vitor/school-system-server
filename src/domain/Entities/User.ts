import BaseEntity from "./BaseEntity";
import IUser from "./Interfaces/IUser";

import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import errors from '../../../errors.json';

export default class User extends BaseEntity implements IUser {
    @IsNotEmpty({ message: errors["pt-br"].required, })
    @IsEmail(null, { message: errors["pt-br"].invalid })
    Email: string;

    @IsString({ message: errors["pt-br"].invalid })
    @Length(6, 20, { message: errors["pt-br"].usernameLength, })
    Username: string;

    @IsNotEmpty({ message: errors["pt-br"].requiredPassword, })
    Password: string;

    constructor(email: string, username: string, password: string, id?: string) {
        super(id, new Date());

        this.Email = email;
        this.Username = username;
        this.Password = password;
    }
}