import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import BaseEntity from "./BaseEntity";
import IUser from "./Interfaces/IUser";

export default class User extends BaseEntity implements IUser {
    @IsNotEmpty()
    @IsEmail()
    Email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    Username: string;

    @IsNotEmpty()
    Password: string;
    
    constructor(email: string, username: string, password: string, id?: string) {
        super(id, new Date());

        this.Email = email;
        this.Username = username;
        this.Password = password;
    }
}