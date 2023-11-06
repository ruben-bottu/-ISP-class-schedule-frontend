import axios from '../axios';
import { Course } from '../types';

const getAllCourses = () =>
    axios.get<Course[]>(`${process.env.CLASS_SCHEDULE_PATH}${process.env.COURSES_PATH}`);

const CourseService = {
    getAllCourses,
};

export default CourseService;
