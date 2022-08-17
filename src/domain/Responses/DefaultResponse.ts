import Responses from './Responses';

export default class DefaultResponse<T> {
    public readonly StatusCode: number;
    public readonly Message: string;
    public readonly Data?: T;

    constructor(data?: T, statusCode?: number, message?: string) {
        this.StatusCode = statusCode ?? Responses.SUCCESS.StatusCode;
        this.Message = message ?? Responses.SUCCESS.Message;
        this.Data = data;
    }
}