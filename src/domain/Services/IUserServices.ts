import User from "../Entities/User"
import DefaultResponse from "../Responses/DefaultResponse"

export default interface IUserServices {
    ValidateLogin(username: string, password: string): Promise<DefaultResponse<string>>
    CreateUser(user: User): Promise<DefaultResponse<string>>
}