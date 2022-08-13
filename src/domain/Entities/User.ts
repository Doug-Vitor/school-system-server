import IUser from "./Interfaces/IUser";

export default class User implements IUser {
    Email: string;
    Username: string;
    Password: string;
    
    constructor(email: string, username: string, password: string) {
        this.Email = email;
        this.Username = username;
        this.Password = password;
    }
}