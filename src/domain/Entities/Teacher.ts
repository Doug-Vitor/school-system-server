import ITeacher from "./Interfaces/ITeacher";
import Person from "./Person";

export default class Teacher extends Person implements ITeacher {
    public UserId: string;

    constructor(name: string, birthdate: Date, userId: string) {
        super(name, birthdate, userId);
        this.UserId = userId;
    }
}