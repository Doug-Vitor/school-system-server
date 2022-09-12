import BaseEntity from "../BaseEntity";
import StudentApproval from '../../Types/Grades/StudentApproval';
import IStudentPerformance from "../../Interfaces/Entities/Core/IStudentPerformance";

import { IsNumber } from "class-validator";
import { getInvalidPropertyErrorString } from "../../Constants";

export default class StudentPerformance extends BaseEntity implements IStudentPerformance {
    public SubjectId: string;
    public StudentId: string;

    @IsNumber({ allowNaN: false }, { message: getInvalidPropertyErrorString("Série escolar") })
    public AcademicYear: number;

    @IsNumber({ allowNaN: false }, { message: getInvalidPropertyErrorString("Ano") })
    public Year: number;
    public IsApproved: StudentApproval;

    constructor(subjectId: string, studentId: string, academicYear: number, year: number, isApproved?: StudentApproval, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.SubjectId = subjectId;
        this.StudentId = studentId;

        this.AcademicYear = academicYear < 10 ? academicYear : NaN;
        this.Year = year > 2000 && year <= new Date().getFullYear() ? year : NaN;
        this.IsApproved = isApproved ?? "Pendente";
    }
}