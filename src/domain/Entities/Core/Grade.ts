import { IsNumber } from "class-validator";
import { getInvalidPropertyErrorString } from "../../Constants";
import IGrade from "../../Interfaces/Entities/Core/IGrade";
import StudentApproval from '../../Types/Grades/StudentApproval';
import BaseEntity from "../BaseEntity";

export default class Grade extends BaseEntity implements IGrade {
    public SubjectId: string;
    public StudentId: string;

    @IsNumber({ allowNaN: false }, { message: getInvalidPropertyErrorString("Série escolar") })
    public AcademicYear: number;

    @IsNumber({ allowNaN: false }, { message: getInvalidPropertyErrorString("Ano") })
    public Year: number;
    public Grades: number[];
    public IsApproved: StudentApproval;

    constructor(subjectId: string, studentId: string, academicYear: number, year: number, grades: number[], isApproved?: StudentApproval, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.SubjectId = subjectId;
        this.StudentId = studentId;

        this.AcademicYear = academicYear < 10 ? academicYear : NaN;
        this.Year = year > 2000 && year <= new Date().getFullYear() ? year : NaN;
        this.Grades = grades;
        this.IsApproved = isApproved ?? "Pendente";
    }
}