export interface Course {
    id: number;
    name: string;
}

export interface ClassGroup {
    id: number;
    name: string;
}

export interface Lesson {
    id: number;
    startTimestamp: Date;
    endTimestamp: Date;
    course: Course;
    classGroup: ClassGroup;
}

export interface CourseAndClassGroup {
    course: Course;
    classGroup: ClassGroup;
}

export interface ClassScheduleProposal {
    overlapCount: number;
    combination: CourseAndClassGroup[];
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
