import StudentPerformance from "../../../../domain/Entities/Core/StudentPerformance";
import Activity from "../../../../domain/Entities/Core/Activity";

const getPerformanceFromBody = (body: Record<string, any>): StudentPerformance => {
    const { academicYear, subjectId, studentId, IsApproved } = body;

    return {
        Id: '',
        CreatedAt: new Date(),
        Year: new Date().getFullYear(),
        AcademicYear: academicYear,
        SubjectId: subjectId,
        StudentId: studentId,
        IsApproved: IsApproved
    };
}

const mapActivity = (activity: Record<string, any>): Activity => {
    return {
        Id: '',
        CreatedAt: new Date(),
        StudentPerformanceId: '',
        Description: activity.description,
        Grade: activity.grade
    }
} 
const getActivitiesFromBody = (body: Record<string, any>): Activity[] => {
    const { activities } = body.activities;

    return activities.map(mapActivity);
}

export { getPerformanceFromBody, getActivitiesFromBody }