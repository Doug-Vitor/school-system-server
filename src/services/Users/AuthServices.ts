import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import ErrorResponse from '../../domain/Responses/ErrorResponse';
import Responses from '../../domain/Responses/Responses';

import { secretAccessToken } from '../../../config.json';

interface ITokenPayload {
    UserId: string,
    IsAdmin: boolean
}

function isBearerToken(token?: string) {
    if (token) {
        const parts = token.split(' ');
        if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
    }
    throw new ErrorResponse(Responses.UNAUTHORIZED_ERROR.StatusCode, "Token não fornecido");
}

const generateToken = (tokenPayload: ITokenPayload, expiresIn: number = 86000) => 
    jwt.sign({ ...tokenPayload }, secretAccessToken, { expiresIn });

const validateToken = (headerToken?: string): ITokenPayload => {
    let userId: string = '';
    let isAdmin: boolean = false;
    
    jwt.verify(isBearerToken(headerToken), secretAccessToken, (error, decoded) => {
        if (error) throw new ErrorResponse(Responses.WRONG_CREDENTIALS_ERROR.StatusCode, "Token inválido");
        userId = (decoded as JwtPayload).UserId;
        isAdmin = (decoded as JwtPayload).IsAdmin;
    });

    return {
        UserId: userId,
        IsAdmin: isAdmin
    };
}

const validatePassword = async (givenPassword: string, hashedPassword: string) => (await bcrypt.compare(givenPassword, hashedPassword));

export { generateToken, validateToken, validatePassword }