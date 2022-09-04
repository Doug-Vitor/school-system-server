export default interface IGrade {
    SubjectId: string
    StudentId: string
    
    Year: number
    Grades: Array<number>
    IsApproved: boolean 
}