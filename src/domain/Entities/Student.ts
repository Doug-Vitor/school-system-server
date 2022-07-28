import IStudent from "./Interfaces/IStudent";
import Person from "./Person";

export default class Student extends Person implements IStudent {
    IsActive: Boolean;

    constructor(name: String, birthdate: Date, isActive: Boolean, id?: String | Number) {
        super(name, birthdate, id);

        this.IsActive = isActive;
    }
}