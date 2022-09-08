import Student from "../../domain/Entities/Person/Student";
import Classroom from "../../domain/Entities/Core/Classroom";

import { collectionNames } from "../../domain/Constants";
import GenericRepository from "./GenericRepository";
import DefaultResponse from "../../domain/Responses/DefaultResponse";

export default class StudentRepository extends GenericRepository<Student> {
    private _classRoomRepository: GenericRepository<Classroom>

    constructor() {
        super(collectionNames.students);
        this._classRoomRepository = new GenericRepository(collectionNames.classrooms);
    }

    public override async Insert(student: Student): Promise<DefaultResponse<Student>> {
        await this._classRoomRepository.GetById(student.ClassroomId);
        return super.Insert(student);
    }

    public override async Update(id: string, student: Student): Promise<DefaultResponse<Student>> {
        await this._classRoomRepository.GetById(student.ClassroomId);
        return super.Update(id, student);
    }
}