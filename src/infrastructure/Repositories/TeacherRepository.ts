import Teacher from "../../domain/Entities/Teacher";
import IBaseRepository from "../../domain/Repositories/Interfaces/IBaseRepository";
import Firestore from "../Firestore";

import DefaultResponse from "../../domain/Responses/DefaultResponse";
import ErrorResponse from '../../domain/Responses/ErrorResponse';
import Responses from "../../domain/Responses/Responses";

export default class TeacherRepository implements IBaseRepository<Teacher> {
    private _firestore: Firestore<Teacher>;

    constructor() {
        this._firestore = new Firestore<Teacher>("teachers");
    }

    private ValidateId(id: string) {
        if (!id) throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, "Forneça um identificador (ID) válido.");
    }

    public async Insert(object: Teacher): Promise<DefaultResponse<Teacher>> {
        try {
            return this.GetById((await this._firestore.AddDoc(object)).id);
        } catch (error) {
            throw new ErrorResponse();
        }
    }

    public async GetById(id: string): Promise<DefaultResponse<Teacher>> {
        try {
            this.ValidateId(id);
            const teacher = (await this._firestore.GetDocById(id)).data() as Teacher;

            if (teacher) return new DefaultResponse(teacher);
            throw new ErrorResponse(Responses.NOT_FOUND_ERROR.StatusCode, "Não foi possível encontrar um professor com o identificador fornecido.");
        } catch (error) {
            throw error instanceof ErrorResponse ? error : new ErrorResponse();
        }
    }

    public async GetWithPagination(page?: number | undefined): Promise<DefaultResponse<Teacher[]>> {
        try {
            const teachers: Teacher[] = [];

            (await this._firestore.GetDocs()).docs.forEach(doc => {
                teachers.push(doc.data() as Teacher);
            })

            return new DefaultResponse(teachers);
        } catch (error) {
            throw new ErrorResponse();
        }
    }

    public async Update(id: string, object: Teacher): Promise<DefaultResponse<Teacher>> {
        try {
            const teacher = Object.assign({ ...(await this.GetById(id)).Data }, object);
            return new DefaultResponse(teacher);
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