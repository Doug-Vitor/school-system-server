import Responses from './Responses';

export default class DefaultResponse<T> extends Error {
    public readonly StatusCode: number;
    public readonly Message: string;
    public readonly Data?: T;

    constructor(statusCode?: number, message?: string, data?: T) {
        const error = Responses.INTERNAL_ERROR;
        super(message ?? error.Message);
        
        this.StatusCode = statusCode ?? error.StatusCode;
        this.Message = message ?? error.Message;
        this.Data = data;
    }

    static BadRequest(data?: {}) {
        const response = Responses.BAD_REQUEST_ERROR;
        return new DefaultResponse(response.StatusCode, response.Message, data);
    }
}