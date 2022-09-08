export default interface ITeacherServices {
    ValidateTeacherPermissions(authenticatedTeacherId: string, subjectId: string, studentId: string): Promise<void>
}