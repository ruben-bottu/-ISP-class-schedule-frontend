import axios from '../axios';
import { Course } from '../types';

const getAllCourses = () => axios.get<Course[]>('/courses');

const CourseService = {
    getAllCourses,
};

export default CourseService;
