import Responses from './Responses';

export default class DefaultResponse {
    public readonly StatusCode: number;
    public readonly Message: string;
    public readonly ErrorsMessages?: string[];

    constructor(statusCode: number, message: string, errorsMessages?: string[]) {
        this.StatusCode = statusCode;
        this.Message = message;
        this.ErrorsMessages = errorsMessages;
    }

    public static GetSuccessResponse(statusCode: number, message: string): DefaultResponse {
        const success = Responses.SUCCESS;
        return new DefaultResponse(statusCode ?? success.StatusCode, message ?? success.Message);
    }

    public static GetErrorResponse(statusCode: number, message: string, errorsMessages: string[]): DefaultResponse {
        const error = Responses.INTERNAL_ERROR;
        return new DefaultResponse(statusCode ?? error.StatusCode, message ?? error.Message, errorsMessages);
    }
}