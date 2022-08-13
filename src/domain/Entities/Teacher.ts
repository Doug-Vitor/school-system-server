import ITeacher from "./Interfaces/ITeacher";
import Person from "./Person";

export default class Teacher extends Person implements ITeacher {
    public UserId: string;

    constructor(name: string, birthdate: Date, userId: string, id?: string) {
        super(name, birthdate, id);
        this.UserId = userId;
    }
}