import IActivity from "../../Interfaces/Entities/Core/IActivity";
import BaseEntity from "../BaseEntity";

export default class Activity extends BaseEntity implements IActivity {
    public Description: string;
    public Grade: number;
    public StudentPerformanceId: string;

    constructor(description: string, grade: number, studentPerformanceId: string, id?: string, createdAt?: Date) {
        super(id, createdAt);

        this.Description = description;
        this.Grade = grade;
        this.StudentPerformanceId = studentPerformanceId;
    }
}