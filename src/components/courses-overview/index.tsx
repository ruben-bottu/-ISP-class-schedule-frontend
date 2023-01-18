import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Course } from '../../types';
import CourseService from '../../services/CourseService';
import { AxiosResponse } from 'axios';

const CourseOverview: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        const res: AxiosResponse<Course[]> = await CourseService.getAllCourses();
        setCourses(res.data);
    };

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {courses &&
                    courses.map((course) => (
                        <tr>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default CourseOverview;
