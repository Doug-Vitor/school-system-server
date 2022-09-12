import { IsNumber, IsString } from "class-validator";
import { getInvalidPropertyErrorString } from "../../Constants";
import IStudent from "../../Interfaces/Entities/Person/IStudent";
import Person from "./Person";

export default class Student extends Person implements IStudent {
    @IsString({ message: getInvalidPropertyErrorString("Sala de aula") })
    public ClassroomId: string;

    @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 }, { message: getInvalidPropertyErrorString("Ano acadêmico") })
    public AcademicYear: number;
    public MedicalObservations?: string | undefined;
    public IsActive: boolean;

    constructor(name: string, birthdate: Date, phoneNumber: string, realId: string, zipCode: string, classroomId: string, academicYear: number, isActive: boolean, medicalObservations: string = '', createdAt?: Date, id?: string) {
        super(name, birthdate, phoneNumber, realId, zipCode, createdAt, id);
        
        this.ClassroomId = classroomId;
        this.AcademicYear = academicYear < 10 ? academicYear : NaN;
        this.MedicalObservations = medicalObservations;
        this.IsActive = isActive;
    }
}