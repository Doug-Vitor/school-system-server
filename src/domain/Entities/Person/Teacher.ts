import ITeacher from "../../Interfaces/Entities/Person/ITeacher";
import Person from "./Person";

export default class Teacher extends Person implements ITeacher {
    public UserId: string;
    public SubjectsIds: string[];
    public ClassroomsIds: string[];

    constructor(userId: string, name: string, birthdate: Date, subjectsIds: string[], classroomsIds: string[], createdAt?: Date) {
        super(name, birthdate, createdAt, userId);

        this.UserId = userId;
        this.SubjectsIds = subjectsIds;
        this.ClassroomsIds = classroomsIds;
    }
}