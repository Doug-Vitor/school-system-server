import BaseEntity from "../../domain/Entities/BaseEntity";

import Firestore from "../Firestore";
import IBaseRepository from "../../domain/Repositories/Interfaces/IBaseRepository";
import IPaginationParameters from "../../domain/Interfaces/Infrastructure/Pagination/IPaginationParameters";

import Responses from "../../domain/Responses/Responses";
import DefaultResponse from "../../domain/Responses/DefaultResponse";
import ErrorResponse from '../../domain/Responses/ErrorResponse';
import { validateOrReject, ValidationError } from "class-validator";

export default class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
    private _firestore: Firestore<T>;

    constructor(collectionName: string) {
        this._firestore = new Firestore<T>(collectionName);
    }

    private ValidateId(id: string) {
        if (!id) throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, "Forneça um identificador (ID) válido.");
    }

    public async Insert(object: T): Promise<DefaultResponse<T>> {
        try {
            await validateOrReject(object);
            return this.GetById((await this._firestore.AddDoc(object)).id);
        } catch (error) { throw this.GetErrorObject(error) }
    }

    public async GetById(id: string): Promise<DefaultResponse<T>> {
        try {
            this.ValidateId(id);
            const object = (await this._firestore.GetDocById(id)).data();

            if (object) return new DefaultResponse(object);
            throw new ErrorResponse(Responses.NOT_FOUND_ERROR.StatusCode, "Não foi possível encontrar nenhum resultado que corresponda ao identificador fornecido.");
        } catch (error) { throw this.GetErrorObject(error) }
    }


    public async GetByField(fieldName: string, query: string, pagination: IPaginationParameters): Promise<DefaultResponse<T[]>> {
        try {
            const objects: T[] = [];

            const response = await this._firestore.GetDocsByField(fieldName, query, pagination);
            (await response.DocumentsSnapshot).docs.forEach(doc => objects.push(doc.data()));

            if (objects) return new DefaultResponse(objects, response.Pagination);
            throw new ErrorResponse(Responses.NOT_FOUND_ERROR.StatusCode, "Não foi possível encontrar resultados que corresponda aos parâmetros fornecidos.");
        } catch (error) { throw this.GetErrorObject(error) }
    }

    public async GetWithPagination(pagination: IPaginationParameters): Promise<DefaultResponse<T[]>> {
        try {
            const objects: T[] = [];

            const response = await this._firestore.GetDocs(pagination);
            (await response.DocumentsSnapshot).forEach(doc => objects.push(doc.data()));

            return new DefaultResponse(objects, response.Pagination);
        } catch (error) { throw this.GetErrorObject(error) }
    }

    public async Update(id: string, object: T): Promise<DefaultResponse<T>> {
        try {
            await validateOrReject(object);
            const updated = Object.assign({ ...(await this.GetById(id)).Data }, object);
            if (id != updated.Id) throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, "Identificador fornecido não é idêntico ao identificador armazenado");

            this._firestore.UpdateDoc(id, updated);
            return new DefaultResponse(updated);
        } catch (error) { throw this.GetErrorObject(error) }
    }

    public async Delete(id: string): Promise<DefaultResponse<void>> {
        try {
            await this._firestore.DeleteDoc((await this.GetById(id)).Data?.Id as string);
            return new DefaultResponse();
        } catch (error) { throw this.GetErrorObject(error) }
    }

    private GetErrorObject(error: ErrorResponse<unknown> | unknown) {
        console.log(error);
        if (error instanceof ErrorResponse) return error;
        else if (error instanceof Array<ValidationError>) {
            const response = Responses.BAD_REQUEST_ERROR;
            const errors = error.map((validationError: ValidationError) => validationError.constraints);
            return new ErrorResponse(response.StatusCode, response.Message, errors);
        }

        return new ErrorResponse();
    }
}