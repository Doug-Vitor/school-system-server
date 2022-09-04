import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import ErrorResponse from '../domain/Responses/ErrorResponse';
import Responses from '../domain/Responses/Responses';

import { secretAccessToken } from '../../config.json';

function isBearerToken(token?: string) {
    if (token) {
        const parts = token.split(' ');
        if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
    }
    throw new ErrorResponse(Responses.UNAUTHORIZED_ERROR.StatusCode, "Token não fornecido");
}

const generateToken = (userId: string, expiresIn: number = 86000) => jwt.sign({ userId }, secretAccessToken, { expiresIn });

const validateToken = (headerToken?: string) => jwt.verify(isBearerToken(headerToken), secretAccessToken, error => {
    if (error) throw new ErrorResponse(Responses.WRONG_CREDENTIALS_ERROR.StatusCode, "Token inválido");
    else return true;
});

const validatePassword = async (givenPassword: string, hashedPassword: string) => (await bcrypt.compare(givenPassword, hashedPassword));

export { generateToken, validateToken, validatePassword }