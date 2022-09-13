import axios from '../axios';
import { Lesson, Response } from '../types';

const getAllLessons = () => axios.get<Lesson[]>('/api/schedule/lessons');

//const addLecturer = (lecturer: Lecturer) => axios.post<Response>('/lecturers', lecturer);

const LecturerService = {
    getAllLessons
};

export default LecturerService;