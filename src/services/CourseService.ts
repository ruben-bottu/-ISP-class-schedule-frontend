import axios from '../axios';
import { Course } from '../types';

// TODO CLASS_SCHEDULE_DIR and COURSES_DIR
const getAllCourses = () =>
    axios.get<Course[]>(`${process.env.CLASS_SCHEDULE_SUBFOLDER}${process.env.COURSES_SUBFOLDER}`);

const CourseService = {
    getAllCourses,
};

export default CourseService;
