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
            console.error(error);
            throw error;
        }
    }

    async getById(id: string): Promise<Teacher> {
        try {
            return (await this._firestore.getDocById(id)).data() as Teacher;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getWithPagination(page?: number | undefined): Promise<Teacher[]> {
        try {
            const teachers: Teacher[] = [];

            (await this._firestore.getDocs()).docs.forEach(doc => {
                teachers.push(doc.data() as Teacher);
            })

            return teachers;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(id: string, object: Teacher): Promise<Teacher> {
        try {
            await this._firestore.updateDoc(id, object);
            return await this.getById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this._firestore.deleteDoc(id);
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}