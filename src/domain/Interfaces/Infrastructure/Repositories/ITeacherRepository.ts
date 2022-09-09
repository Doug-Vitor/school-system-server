export default interface ITeacherRepository {
    ValidateTeacherPermissions(authenticatedTeacherId: string, subjectId: string, studentId: string): Promise<void>
}