import ITeacher from "./Interfaces/ITeacher";
import Person from "./Person";

export default class Teacher extends Person implements ITeacher {
    constructor(name: String, birthdate: Date, id?: String | Number) {
        super(name, birthdate, id);
    }
}