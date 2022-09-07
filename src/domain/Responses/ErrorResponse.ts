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

    static AccessDenied(data?: {}) {
        const response = Responses.ACCESS_DENIED_ERROR;
        return new ErrorResponse(response.StatusCode, response.Message, data);
    }
}