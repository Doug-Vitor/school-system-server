import User from "../../Entities/Authentication/User";
import DefaultResponse from "../../Responses/DefaultResponse"
import IAuthenticationInfos from "../Responses/IAuthenticationInfos";

export default interface IUserServices {
    ValidateLogin(username: string, password: string): Promise<DefaultResponse<IAuthenticationInfos> | unknown>
    CreateUser(user: User): Promise<DefaultResponse<IAuthenticationInfos> | unknown>
}