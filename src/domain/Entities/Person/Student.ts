import IStudent from "../../Interfaces/Entities/Person/IStudent";
import Person from "./Person";

export default class Student extends Person implements IStudent {
    public ClassroomId: string;
    public AcademicYear: number;
    public MedicalObservations?: string | undefined;
    public IsActive: boolean;

    constructor(name: string, birthdate: Date, phoneNumber: string, realId: string, zipCode: string, classroomId: string, academicYear: number, isActive: boolean, medicalObservations?: string, createdAt?: Date, id?: string) {
        super(name, birthdate, phoneNumber, realId, zipCode, createdAt, id);
        
        this.ClassroomId = classroomId;
        this.AcademicYear = academicYear;
        this.MedicalObservations = medicalObservations;
        this.IsActive = isActive;
    }
}