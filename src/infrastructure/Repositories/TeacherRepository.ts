import Teacher from "../../domain/Entities/Teacher";
import IBaseRepository from "../../domain/Repositories/Interfaces/IBaseRepository";
import Firestore from "../Firestore";

export default class TeacherRepository implements IBaseRepository<Teacher> {
    private _firestore: Firestore<Teacher>;

    constructor() {
        this._firestore = new Firestore<Teacher>("teachers");
    }

    async insert(object: Teacher): Promise<Teacher> {
        try {
            return this.getById((await this._firestore.addDoc(object)).id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: string): Promise<Teacher> {
        try {
            return (await this._firestore.getDocById(id)).data() as Teacher;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getWithPagination(page?: number | undefined): Promise<Teacher[]> {
        throw new Error("Method not implemented.");
    }

    update(id: string, object: Teacher): Promise<Teacher> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}