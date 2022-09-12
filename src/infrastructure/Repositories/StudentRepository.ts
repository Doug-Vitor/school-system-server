import Student from "../../domain/Entities/Person/Student";
import Classroom from "../../domain/Entities/Core/Classroom";

import { collectionNames } from "../../domain/Constants";
import GenericRepository from "./GenericRepository";
import DefaultResponse from "../../domain/Responses/DefaultResponse";
import { converter } from "../Converters/PersonConverter";

export default class StudentRepository extends GenericRepository<Student> {
    private _classRoomRepository: GenericRepository<Classroom>

    constructor() {
        super(collectionNames.students, converter());
        this._classRoomRepository = new GenericRepository(collectionNames.classrooms);
    }

    public override async Insert(student: Student): Promise<DefaultResponse<Student>> {
        try {
            await this._classRoomRepository.GetById(student.classroomId);
            return await super.Insert(student);
        } catch (error) { throw super.GetErrorObject(error) }
    }

    public override async Update(id: string, student: Student): Promise<DefaultResponse<Student>> {
        try {
            await this._classRoomRepository.GetById(student.classroomId);
            return await super.Update(id, student);
        } catch (error) { throw super.GetErrorObject(error) }
    }
}