import Responses from './Responses';
import { getNotFoundErrorString } from '../Constants';

export default class ErrorResponse<T> extends Error {
    public readonly statusCode: number;
    public readonly errorMessage: string;
    public readonly data: T;

    constructor(statusCode?: number, message?: string, data: T = {} as T) {
        const error = Responses.INTERNAL_ERROR;
        super(message ?? error.Message);
        
        this.statusCode = statusCode ?? error.StatusCode;
        this.errorMessage = message ?? error.Message;
        this.data = data;
    }

    static BadRequest(errorMessage?: string, data?: {}) {
        const response = Responses.BAD_REQUEST_ERROR;
        return new ErrorResponse(response.StatusCode, errorMessage ?? response.Message, data);
    }

    static NotFound(entityNotFound?: string) {
        const response = Responses.NOT_FOUND_ERROR;
        return new ErrorResponse(response.StatusCode, getNotFoundErrorString(entityNotFound));
    }

    static Unauthorized(errorMessage?: string, data?: {}) {
        const response = Responses.UNAUTHORIZED_ERROR;
        return new ErrorResponse(response.StatusCode, errorMessage ?? response.Message, data);
    }

    static AccessDenied(errorMessage?: string, data?: {}) {
        const response = Responses.ACCESS_DENIED_ERROR;
        return new ErrorResponse(response.StatusCode, errorMessage ?? response.Message, data);
    }
}