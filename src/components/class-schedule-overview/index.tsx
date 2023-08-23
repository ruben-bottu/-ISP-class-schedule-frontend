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
import SelectSearch from 'react-select-search';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

// https://blog.logrocket.com/why-react-doesnt-update-state-immediately/
const ClassScheduleOverview: React.FC = () => {
    const MIN_SELECTED_COURSES_COUNT = 2;
    const [courses, setCourses] = useState<Course[]>([]); // called once
    const [courseSearchInput, setCourseSearchInput] = useState<string>('');
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
    const [foundCoursesByName, setFoundCoursesByName] = useState<Course[]>([]);
    const [proposals, setProposals] = useState<ClassScheduleProposal[]>([]);
    // example: setStatusMessages([{ message: 'Course is already selected', type: 'error' }]);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const getCourses = async () => {
        const res: AxiosResponse<Course[]> = await CourseService.getAllCourses();
        setCourses(res.data);
    };

    useEffect(() => {
        getCourses();
    }, []);

    const removeAllWhiteSpace = (string: string): string => string.replace(/\s+/g, '');

    const toNoSpaceLowerCase = (string: string): string =>
        removeAllWhiteSpace(string).toLowerCase();

    const findCoursesByNameIncludesSearchInput = (): Course[] => {
        const parsedSearchInput = toNoSpaceLowerCase(courseSearchInput);
        return !parsedSearchInput
            ? []
            : courses
                  .filter((course) => !selectedCourses.includes(course))
                  .filter(({ name }) => toNoSpaceLowerCase(name).includes(parsedSearchInput));
    };

    useEffect(() => {
        setFoundCoursesByName(findCoursesByNameIncludesSearchInput());
    }, [courseSearchInput]);

    const onSelectCourse = (course: Course) => {
        setSelectedCourses([...selectedCourses, course]);
        setCourseSearchInput('');
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
            message: `Are you sure you want to delete this course?`,
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
                {/* <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    events={[
                        { title: 'event 1', date: '2023-04-01' },
                        { title: 'event 2', date: '2023-04-02' },
                        {
                            title: 'cool event',
                            start: '2023-04-03T12:00:00',
                            end: '2023-04-03T16:00:00',
                        },
                    ]}
                /> */}
                <h1 style={{ color: '#012442' }}>Class Scheduler</h1>
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
                        value={courseSearchInput}
                        onChange={(event) => setCourseSearchInput(event.target.value)}
                    />
                    <CoursesOverviewList
                        courses={foundCoursesByName}
                        handleOnClick={onSelectCourse}
                    />
                </section>
                <CoursesOverviewTable
                    courses={selectedCourses}
                    handleOnDelete={onDeleteSelectedCourse}
                />
                {selectedCourses && selectedCourses.length >= MIN_SELECTED_COURSES_COUNT && (
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
