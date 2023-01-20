import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { ClassScheduleProposal, Course, StatusMessage } from '../../types';
import CourseService from '../../services/CourseService';
import { AxiosResponse } from 'axios';
import CoursesOverviewTable from './CoursesOverviewTable';
import CoursesOverviewList from './CoursesOverviewList';
import ClassScheduleService from '../../services/ClassScheduleService';
import ClassScheduleProposalsOverviewList from './ClassScheduleProposalsOverviewList';

// https://blog.logrocket.com/why-react-doesnt-update-state-immediately/
const ClassScheduleOverview: React.FC = () => {
    const MIN_AMOUNT_SELECTED_COURSES = 2;
    const [courses, setCourses] = useState<Course[]>([]);
    const [courseNameSearchInput, setCourseNameSearchInput] = useState<string>('');
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
    const [proposals, setProposals] = useState<ClassScheduleProposal[]>([]);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        const res: AxiosResponse<Course[]> = await CourseService.getAllCourses();
        setCourses(res.data);
    };

    const removeAllWhiteSpace = (string: string): string => {
        return string.replace(/\s+/g, '');
    };

    const toNoSpaceLowerCase = (string: string): string => {
        return removeAllWhiteSpace(string).toLowerCase();
    };

    const foundCourses = (): Course[] => {
        const parsedSearchInput = toNoSpaceLowerCase(courseNameSearchInput);
        if (!parsedSearchInput) return [];
        return courses
            .filter((course) => !selectedCourses.includes(course))
            .filter(({ name }) => toNoSpaceLowerCase(name).includes(parsedSearchInput));
    };

    const onSelectCourse = (course: Course) => {
        /* if (selectedCourses.includes(course)) {
            setStatusMessages([{ message: 'Course is already selected', type: 'error' }]);
        } else { */
        setSelectedCourses([...selectedCourses, course]);
        //}
        setCourseNameSearchInput('');
    };

    const onCalculateProposals = async () => {
        const res: AxiosResponse<ClassScheduleProposal[]> = await ClassScheduleService.getProposals(
            selectedCourses
        );
        setProposals(res.data);
    };

    return (
        <>
            <h1>Class Schedule Generator</h1>
            <p className="mb-md-4">
                Select the courses that you want to follow and generate your ideal class schedule
            </p>
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
            <section className="mb-md-5">
                <input
                    type="text"
                    className="form-control p-3"
                    placeholder="Search by course name"
                    value={courseNameSearchInput}
                    onChange={(event) => setCourseNameSearchInput(event.target.value)}
                />
                <CoursesOverviewList courses={foundCourses()} handleOnClick={onSelectCourse} />
            </section>
            <CoursesOverviewTable courses={selectedCourses} />
            {selectedCourses && selectedCourses.length >= MIN_AMOUNT_SELECTED_COURSES && (
                <button onClick={onCalculateProposals} className="btn btn-primary mt-md-2 mb-md-5">
                    Calculate
                </button>
            )}
            <ClassScheduleProposalsOverviewList proposals={proposals} />
        </>
    );
};

export default ClassScheduleOverview;
