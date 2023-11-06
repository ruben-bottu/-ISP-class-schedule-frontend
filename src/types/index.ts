export interface Course {
    id: number;
    name: string;
}

export interface Group {
    id: number;
    name: string;
}

export interface CourseGroup {
    id: number;
    course: Course;
    group: Group;
}

export interface Lesson {
    id: number;
    startTimestamp: Date;
    endTimestamp: Date;
    courseName: string;
    groupName: string;
}

export interface ClassScheduleProposal {
    averageWeeklyOverlapCount: number;
    combination: CourseGroup[];
}

export interface Response {
    status: 'error' | 'success';
    lecturerId?: number;
    errorMessage?: string;
}

export interface StatusMessage {
    message: string;
    type: 'error' | 'success';
}
