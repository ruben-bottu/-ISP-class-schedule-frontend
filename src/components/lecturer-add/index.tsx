import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import CourseService from '../../services/CourseService';
import LecturerService from '../../services/LecturerService';
import { Course, Lecturer, Response, StatusMessage } from '../../types';
import CoursesOverviewTable from '../courses-overview-table';
import classNames from 'classnames';

const LecturerAdd: React.FC = () => {
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
    const [nameInput, setNameInput] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    useEffect(() => {
        getAllCourses();
    }, []);

    const getAllCourses = async () => {
        const res: AxiosResponse<Course[]> = await CourseService.getAllCourses();
        setAllCourses(res.data);
    };

    const handleChangeSelectedCourses = (courses: Course[]) => {
        setSelectedCourses(courses);
    };

    const addLecturer = async (lecturerInput: Lecturer) => {
        try {
            await LecturerService.addLecturer(lecturerInput);
            setStatusMessages([
                { message: `Lecturer ${nameInput} successfully added.`, type: 'success' },
            ]);
            setNameInput('');
            setSelectedCourses([]);
        } catch (error: any) {
            setStatusMessages([
                ...statusMessages,
                { message: error.response.data.errorMessage, type: 'error' },
            ]);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (nameInput.trim() === '') {
            setStatusMessages([{ message: 'Please fill in name.', type: 'error' }]);
        } else {
            const lecturerInput = { name: nameInput, courses: selectedCourses };
            addLecturer(lecturerInput);
        }
    };

    return (
        <section className="row justify-content-center">
            {statusMessages && (
                <ul className="list-unstyled col-4 mb-3">
                    {statusMessages.map(({ message, type }, index) => (
                        <li
                            key={index}
                            className={classNames({
                                'text-danger': type === 'error',
                                'text-success': type === 'success',
                            })}
                        >
                            {message}
                        </li>
                    ))}
                </ul>
            )}
            <div className="w-100 d-none d-md-block" />
            <div className="col-4 mb-3">
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            className="m-sm-2"
                            type="text"
                            value={nameInput}
                            onChange={(event) => setNameInput(event.target.value)}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div className="w-100 d-none d-md-block" />
            {allCourses && (
                <CoursesOverviewTable
                    courses={allCourses}
                    onChange={handleChangeSelectedCourses}
                    clickable
                />
            )}
        </section>
    );
};

export default LecturerAdd;
