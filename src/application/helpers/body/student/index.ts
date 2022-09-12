import StudentPerformance from "../../../../domain/Entities/Core/StudentPerformance";
import Activity from "../../../../domain/Entities/Core/Activity";

const getPerformanceFromBody = (body: Record<string, any>): StudentPerformance => {
    const { academicYear, subjectId, studentId, isApproved } = body;    

    return {
        Id: '',
        CreatedAt: new Date(),
        Year: new Date().getFullYear(),
        AcademicYear: academicYear,
        SubjectId: subjectId,
        StudentId: studentId,
        IsApproved: isApproved
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
    const { activities } = body;

    return activities.map(mapActivity);
}

export { getPerformanceFromBody, getActivitiesFromBody }