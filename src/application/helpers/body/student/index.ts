import StudentPerformance from "../../../../domain/Entities/Core/StudentPerformance";
import Activity from "../../../../domain/Entities/Core/Activity";

const getPerformanceFromBody = (body: Record<string, any>): StudentPerformance => {
    const { academicYear, subjectId, studentId, isApproved } = body;
    
    return {
        id: '',
        createdAt: new Date(),
        year: new Date().getFullYear(),
        academicYear,
        subjectId,
        studentId,
        isApproved
    };
}

const mapActivity = (activity: Record<string, any>): Activity => {
    return {
        id: activity.id ?? '',
        createdAt: new Date(),
        studentPerformanceId: '',
        description: activity.description,
        grade: activity.grade
    }
} 
const getActivitiesFromBody = (body: Record<string, any>): Activity[] => {
    const { activities } = body;

    return activities.map(mapActivity);
}

export { getPerformanceFromBody, getActivitiesFromBody }