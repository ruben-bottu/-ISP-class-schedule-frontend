import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import LessonService from '../../services/LessonService';
import { Lesson } from '../../types';
import CoursesOverviewTable from '../courses-overview-table';
import useInterval from 'use-interval';

const LessonOverview: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);

    useEffect(() => {
        getLessons();
    }, []);

    useInterval(() => {
        getLessons();
    }, 5000);

    const getLessons = async () => {
        const res: AxiosResponse<Lesson[]> = await LessonService.getAllLessons();
        setLessons(res.data);
    }

    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>start</th>
                        <th>end</th>
                        <th>course name</th>
                        <th>class group name</th>
                    </tr>
                </thead>
                <tbody>
                {lessons && lessons.map(lesson => (
                        <tr>
                            <td>{lesson.id}</td>
                            <td>{lesson.startTimestamp}</td>
                            <td>{lesson.endTimestamp}</td>
                            <td>{lesson.courseName}</td>
                            <td>{lesson.classGroupName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default LessonOverview;