import BaseEntity from "../BaseEntity";
import IClassroom from "../../Interfaces/Entities/Core/IClassroom";

export default class Classroom extends BaseEntity implements IClassroom {
    public Room: string;
    public ForAcademicYear: number;
    public MaxLength: number;

    constructor(room: string, forAcademicYear: number, maxLength: number, createdAt?: Date, id?: string) {
        super(id, createdAt);
        
        this.ForAcademicYear = forAcademicYear;
        this.MaxLength = maxLength;
        this.Room = `${this.ForAcademicYear} ano ${room}`;
    }
}