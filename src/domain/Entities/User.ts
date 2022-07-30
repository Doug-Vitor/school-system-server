import IUser from "./Interfaces/IUser";

export default class User implements IUser {
    Email: String;
    Username: String;
    Password: String;

    OwnerId: String | Number;
    
    constructor(email: String, username: String, password: String, ownerId: String | Number) {
        this.Email = email;
        this.Username = username;
        this.Password = password,

        this.OwnerId = ownerId;
    }
}