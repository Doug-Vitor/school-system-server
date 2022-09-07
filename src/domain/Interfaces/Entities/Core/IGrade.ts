import StudentApproval from '../../../Types/Grades/StudentApproval';

export default interface IGrade {
    SubjectId: string
    StudentId: string
    
    Year: number
    AcademicYear: number
    Grades: Array<number>
    IsApproved: StudentApproval
}