import BaseEntity from "../../domain/Entities/BaseEntity";

import IBaseRepository from "../../domain/Repositories/Interfaces/IBaseRepository";
import Firestore from "../Firestore";

import Responses from "../../domain/Responses/Responses";
import DefaultResponse from "../../domain/Responses/DefaultResponse";
import ErrorResponse from '../../domain/Responses/ErrorResponse';

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
            return this.GetById((await this._firestore.AddDoc(object)).id);
        } catch (error) {
            throw new ErrorResponse();
        }
    }

    public async GetById(id: string): Promise<DefaultResponse<T>> {
        try {
            this.ValidateId(id);
            const object = (await this._firestore.GetDocById(id)).data() as T;

            if (object) return new DefaultResponse(object);
            throw new ErrorResponse(Responses.NOT_FOUND_ERROR.StatusCode, "Não foi possível encontrar nenhum resultado que corresponda ao identificador fornecido.");
        } catch (error) {
            throw error instanceof ErrorResponse ? error : new ErrorResponse();
        }
    }


    public async GetByField(fieldName: string, query: string): Promise<DefaultResponse<T[]>> {
        try {
            const objects: T[] = [];

            (await this._firestore.GetDocsByField(fieldName, query)).docs.forEach(doc => objects.push(doc.data() as T));

            if (objects) return new DefaultResponse(objects);
            throw new ErrorResponse(Responses.NOT_FOUND_ERROR.StatusCode, "Não foi possível encontrar resultados que corresponda aos parâmetros fornecidos.");
        } catch (error) {
            throw error instanceof ErrorResponse ? error : new ErrorResponse();
        }
    }

    public async GetWithPagination(page?: number | undefined): Promise<DefaultResponse<T[]>> {
        try {
            const objects: T[] = [];

            (await this._firestore.GetDocs()).docs.forEach(doc => objects.push(doc.data() as T));

            return new DefaultResponse(objects);
        } catch (error) {
            throw new ErrorResponse();
        }
    }

    public async Update(id: string, object: T): Promise<DefaultResponse<T>> {
        try {
            const updated = Object.assign({ ...(await this.GetById(id)).Data }, object);
            if (id != updated.Id) throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, "Identificador fornecido não é idêntico ao identificador armazenado");

            this._firestore.UpdateDoc(id, updated);
            return new DefaultResponse(updated);
        } catch (error) {
            throw error instanceof ErrorResponse ? error : new ErrorResponse();
        }
    }

    public async Delete(id: string): Promise<DefaultResponse<void>> {
        try {
            await this._firestore.DeleteDoc((await this.GetById(id)).Data?.Id as string);
            return new DefaultResponse();
        } catch (error) {
            throw error instanceof ErrorResponse ? error : new ErrorResponse();
        }
    }
}