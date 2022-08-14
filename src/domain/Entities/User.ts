import BaseEntity from "./BaseEntity";
import IUser from "./Interfaces/IUser";

export default class User extends BaseEntity implements IUser {
    Email: string;
    Username: string;
    Password: string;
    
    constructor(email: string, username: string, password: string, id?: string) {
        super(id, new Date());

        this.Email = email;
        this.Username = username;
        this.Password = password;
    }
}