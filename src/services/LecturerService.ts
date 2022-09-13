import axios from '../axios';
import { Lecturer, Response } from '../types';

const getAllLecturers = () => axios.get<Lecturer[]>('/lecturers');

const addLecturer = (lecturer: Lecturer) => axios.post<Response>('/lecturers', lecturer);

const LecturerService = {
    getAllLecturers,
    addLecturer,
};

export default LecturerService;
