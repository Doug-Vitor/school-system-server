import IPerson from "./Interfaces/IPerson";
import BaseEntity from "./BaseEntity";

export default abstract class Person extends BaseEntity implements IPerson {
    Name: String;
    Birthdate: Date;

    constructor(name: String, birthdate: Date, id?: String | Number) {
        super(id);

        this.Name = name;
        this.Birthdate = birthdate;
    }
}