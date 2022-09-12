import StudentApproval from '../../../Types/Grades/StudentApproval';

export default interface IStudentPerformance {
    SubjectId: string
    StudentId: string
    
    Year: number
    AcademicYear: number
    IsApproved: StudentApproval
}