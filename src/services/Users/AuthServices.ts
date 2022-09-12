import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import ErrorResponse from '../../domain/Responses/ErrorResponse';
import Responses from '../../domain/Responses/Responses';

import { secretAccessToken } from '../../../config.json';

interface IToken {
    UserId: string
    IsAdmin: boolean
}

function isBearerToken(token?: string) {
    if (token) {
        const parts = token.split(' ');
        if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
    }
    throw new ErrorResponse(Responses.UNAUTHORIZED_ERROR.StatusCode, "Token não fornecido");
}

const generateToken = (tokenPayload: IToken, expiresIn: number = 86000) => {    
    return {
        generatedToken: jwt.sign({ ...tokenPayload }, secretAccessToken, { expiresIn }),
        expirationDate: new Date(new Date().getTime() + expiresIn * 1000)
    }
}

const validateToken = (headerToken?: string): IToken => {
    let userId: string = '';
    let isAdmin: boolean = false;

    jwt.verify(isBearerToken(headerToken), secretAccessToken, (error, decoded) => {
        if (error) throw new ErrorResponse(Responses.WRONG_CREDENTIALS_ERROR.StatusCode, "Token inválido");
        decoded = (decoded as JwtPayload);

        userId = decoded.UserId;
        isAdmin = decoded.IsAdmin;
    });

    return {
        UserId: userId,
        IsAdmin: isAdmin
    };
}

const validatePassword = async (givenPassword: string, hashedPassword: string) => (await bcrypt.compare(givenPassword, hashedPassword));

export { generateToken, validateToken, validatePassword }