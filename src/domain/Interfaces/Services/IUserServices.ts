import User from "../../Entities/Authentication/User";
import DefaultResponse from "../../Responses/DefaultResponse"

export default interface IUserServices {
    ValidateLogin(username: string, password: string): Promise<DefaultResponse<string> | unknown>
    CreateUser(user: User): Promise<DefaultResponse<string> | unknown>
}