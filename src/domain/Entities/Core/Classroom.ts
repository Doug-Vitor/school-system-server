import BaseEntity from "../BaseEntity";
import IClassroom from "../../Interfaces/Entities/Core/IClassroom";

export default class Classroom extends BaseEntity implements IClassroom {
    public room: string;
    public forAcademicYear: number;
    public maxLength: number;

    constructor(room: string, forAcademicYear: number, maxLength: number, createdAt?: Date, id?: string) {
        super(id, createdAt);
        
        this.forAcademicYear = forAcademicYear;
        this.maxLength = maxLength;
        this.room = `${this.forAcademicYear}º ano ${room}`;
    }
}