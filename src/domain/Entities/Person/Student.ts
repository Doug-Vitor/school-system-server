import { IsNumber, IsString } from "class-validator";
import { getInvalidPropertyErrorString } from "../../Constants";
import IStudent from "../../Interfaces/Entities/Person/IStudent";
import Person from "./Person";

export default class Student extends Person implements IStudent {
    @IsString({ message: getInvalidPropertyErrorString("Sala de aula") })
    public classroomId: string;

    @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 }, { message: getInvalidPropertyErrorString("Ano acadêmico") })
    public academicYear: number;
    public medicalObservations?: string | undefined;
    public isActive: boolean;

    constructor(name: string, birthdate: Date, phoneNumber: string, realId: string, zipCode: string, classroomId: string, academicYear: number, isActive: boolean, medicalObservations: string = '', createdAt?: Date, id?: string) {
        super(name, birthdate, phoneNumber, realId, zipCode, createdAt, id);
        
        this.classroomId = classroomId;
        this.academicYear = academicYear < 10 ? academicYear : NaN;
        this.medicalObservations = medicalObservations;
        this.isActive = isActive;
    }
}