export interface Course {
    name: string;
    description: string;
    phase: number;
}
export interface Lecturer {
    name: string;
    courses: Course[] | null;
}

export interface CourseAndClassGroupName {
    course_name: string;
    class_group_name: string;
}

export interface ScheduleProposal {
    collision_count: number;
    combination: CourseAndClassGroupName[];
}

export interface Lesson {
    id: number;
    startTimestamp: Date;
    endTimestamp: Date;
    courseName: string;
    classGroupName: string;
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
