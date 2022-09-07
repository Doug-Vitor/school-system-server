import Responses from './Responses';

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

    static BadRequest(data?: {}) {
        const response = Responses.BAD_REQUEST_ERROR;
        return new ErrorResponse(response.StatusCode, response.Message, data);
    }

    static Unauthorized(errorMessage?: string, data?: {}) {
        const response = Responses.UNAUTHORIZED_ERROR;
        return new ErrorResponse(response.StatusCode, errorMessage ?? response.Message, data);
    }
}