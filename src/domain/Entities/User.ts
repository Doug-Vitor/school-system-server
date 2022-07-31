import IUser from "./Interfaces/IUser";

export default class User implements IUser {
    Email: string;
    Username: string;
    Password: string;

    OwnerId: string | Number;
    
    constructor(email: string, username: string, password: string, ownerId: string | number) {
        this.Email = email;
        this.Username = username;
        this.Password = password,

        this.OwnerId = ownerId;
    }
}