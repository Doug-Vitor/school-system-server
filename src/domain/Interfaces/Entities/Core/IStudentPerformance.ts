import StudentApproval from '../../../Types/Grades/StudentApproval';

export default interface IStudentPerformance {
    subjectId: string
    studentId: string
    
    year: number
    academicYear: number
    isApproved: StudentApproval
}