import BaseEntity from "../BaseEntity";
import IClassroom from "../../Interfaces/Entities/Core/IClassroom";

export default class Classroom extends BaseEntity implements IClassroom {
    public Room: string;
    public MaxLength: number;

    constructor(room: string, maxLength: number, createdAt?: Date, id?: string) {
        super(id, createdAt);
        
        this.Room = room;
        this.MaxLength = maxLength;
    }
}