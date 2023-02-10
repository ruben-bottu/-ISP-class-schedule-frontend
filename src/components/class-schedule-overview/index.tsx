import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { ClassScheduleProposal, Course, StatusMessage } from '../../types';
import CourseService from '../../services/CourseService';
import { AxiosResponse } from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CoursesOverviewTable from './CoursesOverviewTable';
import CoursesOverviewList from './CoursesOverviewList';
import ClassScheduleService from '../../services/ClassScheduleService';
import ClassScheduleProposalsOverviewList from './ClassScheduleProposalsOverviewList';
import StatusMessagesOverview from '../status-messages-overview/index';

// https://blog.logrocket.com/why-react-doesnt-update-state-immediately/
const ClassScheduleOverview: React.FC = () => {
    const MIN_AMOUNT_SELECTED_COURSES = 2;
    const [courses, setCourses] = useState<Course[]>([]);
    const [courseNameSearchInput, setCourseNameSearchInput] = useState<string>('');
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
    const [proposals, setProposals] = useState<ClassScheduleProposal[]>([]);
    // setStatusMessages([{ message: 'Course is already selected', type: 'error' }]);
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

    const findCoursesByNameIncludesSearchInput = (): Course[] => {
        const parsedSearchInput = toNoSpaceLowerCase(courseNameSearchInput);
        if (!parsedSearchInput) return [];
        return courses
            .filter((course) => !selectedCourses.includes(course))
            .filter(({ name }) => toNoSpaceLowerCase(name).includes(parsedSearchInput));
    };

    const onSelectCourse = (course: Course) => {
        setSelectedCourses([...selectedCourses, course]);
        setCourseNameSearchInput('');
    };

    const onGenerateProposals = async () => {
        const res: AxiosResponse<ClassScheduleProposal[]> = await ClassScheduleService.getProposals(
            selectedCourses
        );
        setProposals(res.data);
    };

    const courseDeletedSuccessfullyAlert = () => {
        toast.success('Course deleted', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };

    const onDeleteSelectedCourse = (course: Course) => {
        confirmAlert({
            title: 'Delete course?',
            message: `Are you sure you want to delete ${course.name}?`,
            buttons: [
                {
                    label: 'Cancel',
                    onClick: () => {},
                },
                {
                    label: 'Yes, delete course',
                    onClick: () => {
                        courseDeletedSuccessfullyAlert();
                        setSelectedCourses(selectedCourses.filter(({ id }) => id !== course.id));
                    },
                },
            ],
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="container">
                <h1 style={{ color: '#012442' }}>Class Schedule Generator</h1>
                <p className="mb-md-4">
                    Select the courses that you want to follow and generate your ideal class
                    schedule
                </p>
                <StatusMessagesOverview statusMessages={statusMessages} />
                <section className="mb-md-5 position-relative">
                    <input
                        type="text"
                        className="form-control p-3"
                        placeholder="Search by course name"
                        value={courseNameSearchInput}
                        onChange={(event) => setCourseNameSearchInput(event.target.value)}
                    />
                    <CoursesOverviewList
                        courses={findCoursesByNameIncludesSearchInput()}
                        handleOnClick={onSelectCourse}
                    />
                </section>
                <CoursesOverviewTable
                    courses={selectedCourses}
                    handleOnDelete={onDeleteSelectedCourse}
                />
                {selectedCourses && selectedCourses.length >= MIN_AMOUNT_SELECTED_COURSES && (
                    <button
                        onClick={onGenerateProposals}
                        className="btn mt-md-2 mb-md-5 w-100"
                        style={{ color: 'white', backgroundColor: '#E38664' }}
                    >
                        Generate
                    </button>
                )}
            </div>
            <ClassScheduleProposalsOverviewList proposals={proposals} />
        </>
    );
};

export default ClassScheduleOverview;
