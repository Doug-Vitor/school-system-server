import BaseEntity from "../BaseEntity";
import StudentApproval from '../../Types/Grades/StudentApproval';
import IStudentPerformance from "../../Interfaces/Entities/Core/IStudentPerformance";

import { IsNumber } from "class-validator";
import { getInvalidPropertyErrorString } from "../../Constants";

export default class StudentPerformance extends BaseEntity implements IStudentPerformance {
    public subjectId: string;
    public studentId: string;

    @IsNumber({ allowNaN: false }, { message: getInvalidPropertyErrorString("Série escolar") })
    public academicYear: number;

    @IsNumber({ allowNaN: false }, { message: getInvalidPropertyErrorString("Ano") })
    public year: number;
    public isApproved: StudentApproval;

    constructor(subjectId: string, studentId: string, academicYear: number, year: number, isApproved?: StudentApproval, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.subjectId = subjectId;
        this.studentId = studentId;

        this.academicYear = academicYear < 10 ? academicYear : NaN;
        this.year = year > 2000 && year <= new Date().getFullYear() ? year : NaN;
        this.isApproved = isApproved ?? "Pendente";
    }
}