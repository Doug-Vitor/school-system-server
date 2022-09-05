import BaseEntity from "../BaseEntity";
import IClassroom from "../../Interfaces/Entities/Core/IClassroom";

export default class Classroom extends BaseEntity implements IClassroom {
    public Description: string;

    constructor(description: string, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.Description = description;
    }
}