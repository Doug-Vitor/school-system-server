import IPerson from "./Interfaces/IPerson";
import BaseEntity from "./BaseEntity";

export default abstract class Person extends BaseEntity implements IPerson {
    Name: string;
    Birthdate: Date;

    constructor(name: string, birthdate: Date, id?: string) {
        super(id);

        this.Name = name;
        this.Birthdate = birthdate;
    }
}