import axios from '../axios';
import { Course } from '../types';

const getAllCourses = () => axios.get<Course[]>(process.env.CLASS_SCHEDULE_URL + '/courses');

const CourseService = {
    getAllCourses,
};

export default CourseService;
