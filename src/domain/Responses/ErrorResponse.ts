import Responses from './Responses';

export default class DefaultResponse<T> extends Error {
    public readonly statusCode: number;
    public readonly message: string;
    public readonly data?: T;

    constructor(statusCode?: number, message?: string, data?: T) {
        const error = Responses.INTERNAL_ERROR;
        super(message ?? error.Message);
        
        this.statusCode = statusCode ?? error.StatusCode;
        this.message = message ?? error.Message;
        this.data = data;
    }

    static BadRequest(data?: {}) {
        const response = Responses.BAD_REQUEST_ERROR;
        return new DefaultResponse(response.StatusCode, response.Message, data);
    }
}