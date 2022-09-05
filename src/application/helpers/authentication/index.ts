import ErrorResponse from '../../../domain/Responses/ErrorResponse';
import Responses from "../../../domain/Responses/Responses";

import { errors } from "../../../domain/Constants";

const validatePassword = (password: string) => {
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%*()_+^&}{:;?.])(?:([0-9a-zA-Z!@#$%;*(){}_+^&])(?!\1)){8,}$/.test(password);
    if (validPassword) return password;
    else throw BadRequestResponse("A senha precisa conter pelo menos 8 caracteres, tendo, dentre eles: um caractere minúsculo, um caractere maiúsculo, um número e um caractere especial")
}

const getBodyForUserLogin = (body: any) => {
    const { username, password } = body;
    validatePassword(password);

    if (username) return { username, password };
    else throw BadRequestResponse(errors.getInvalidPropertyErrorString("Nome de usuário"));
}

const getBodyForUserSignup = (body: any) => {
    const { email } = body;

    if (email) return { email, ...getBodyForUserLogin(body) };
    else throw BadRequestResponse(errors.getInvalidPropertyErrorString("Email"));
}

const BadRequestResponse = (errorMessage: string) => {
    const response = Responses.BAD_REQUEST_ERROR;
    return new ErrorResponse(response.StatusCode, errorMessage);
}

export { getBodyForUserLogin, getBodyForUserSignup }