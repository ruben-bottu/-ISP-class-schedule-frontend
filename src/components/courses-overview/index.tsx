import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Course } from '../../types';
import CourseService from '../../services/CourseService';
import { AxiosResponse } from 'axios';
import CoursesOverviewTable from './CoursesOverviewTable';
import CoursesOverviewList from './CoursesOverviewList';

// https://blog.logrocket.com/why-react-doesnt-update-state-immediately/
const CourseOverview: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [courseNameSearchInput, setCourseNameSearchInput] = useState<string>('');
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        const res: AxiosResponse<Course[]> = await CourseService.getAllCourses();
        setCourses(res.data);
    };

    const foundCourses = (): Course[] => {
        if (!courseNameSearchInput) return [];
        const lowerCaseSearchInput = courseNameSearchInput.toLowerCase();
        return courses.filter(({ name }) => name.toLowerCase().includes(lowerCaseSearchInput));
    };

    const onSelectCourse = (course: Course) => {
        setCourseNameSearchInput('');
        setSelectedCourses([...selectedCourses, course]);
    };

    const onCalculateProposals = () => {};

    return (
        <>
            <h1>Class Schedule Generator</h1>
            <p className="mb-md-4">
                Select the courses that you want to follow and generate your ideal class schedule
            </p>
            <section className="mb-md-5">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by course name"
                    value={courseNameSearchInput}
                    onChange={(event) => setCourseNameSearchInput(event.target.value)}
                />
                <CoursesOverviewList courses={foundCourses()} handleOnClick={onSelectCourse} />
            </section>
            <CoursesOverviewTable courses={selectedCourses} />
            {selectedCourses && !!selectedCourses.length && (
                <button onClick={onCalculateProposals} className="btn btn-primary mt-md-2">
                    Calculate
                </button>
            )}
        </>
    );
};

export default CourseOverview;
