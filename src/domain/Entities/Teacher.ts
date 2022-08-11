import ITeacher from "./Interfaces/ITeacher";
import Person from "./Person";

export default class Teacher extends Person implements ITeacher {
    constructor(name: string, birthdate: Date, id?: string) {
        super(name, birthdate, id);
    }
}