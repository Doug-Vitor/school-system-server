import IStudent from "./Interfaces/IStudent";
import Person from "./Person";

export default class Student extends Person implements IStudent {
    IsActive: boolean;

    constructor(name: string, birthdate: Date, isActive: boolean, id?: string | number) {
        super(name, birthdate, id);

        this.IsActive = isActive;
    }
}