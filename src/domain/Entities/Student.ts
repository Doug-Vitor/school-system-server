import IStudent from "../Interfaces/Entities/IStudent";
import Person from "./Person";

export default class Student extends Person implements IStudent {
    IsActive: boolean;

    constructor(name: string, birthdate: Date, isActive: boolean, id?: string) {
        super(name, birthdate, id);

        this.IsActive = isActive;
    }
}