import IGrade from "../../Interfaces/Entities/Core/IGrade";
import BaseEntity from "../BaseEntity";

export default class Grade extends BaseEntity implements IGrade {
    SubjectId: string;
    StudentId: string;
    Year: number;
    Grades: number[];
    IsApproved: boolean;

    constructor(subjectId: string, studentId: string, year: number, grades: number[], createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.SubjectId = subjectId;
        this.StudentId = studentId;
        this.Year = year;
        this.Grades = grades;
        this.IsApproved = this.GetStudentResult();
    }

    private GetStudentResult() {
        return new Date().getFullYear() > this.Year && this.Grades.length ? 
            this.Grades.reduce((previousGrade, currentGrade) => previousGrade + currentGrade) / this.Grades.length > 7 : false;
    }
}