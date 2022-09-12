import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { getInvalidPropertyErrorString, getLengthErrorString, getRequiredPropertyErrorString } from "../../Constants";
import IActivity from "../../Interfaces/Entities/Core/IActivity";
import BaseEntity from "../BaseEntity";

export default class Activity extends BaseEntity implements IActivity {
    @IsString({ message: getInvalidPropertyErrorString("Descrição da atividade") })
    @Length(5, 250, { message: getLengthErrorString("Descrição da atividade") })
    public description: string;

    @IsNumber({ allowNaN: false }, { message: getInvalidPropertyErrorString("Nota") })
    public grade: number;

    @IsNotEmpty({ message: getRequiredPropertyErrorString("ID do desempenho do aluno") })
    public studentPerformanceId: string;

    constructor(description: string, grade: number, studentPerformanceId: string, id?: string, createdAt?: Date) {
        super(id, createdAt);

        this.description = description;
        this.grade = grade < 10.1 ? grade : NaN;
        this.studentPerformanceId = studentPerformanceId;
    }
}