import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Course } from '../../types';

type Props = {
    courses: Course[];
    onChange?: (selectedCourses: Course[]) => void;
    clickable?: boolean;
};

const CoursesOverviewTable: React.FC<Props> = ({ courses, onChange, clickable = false }: Props) => {
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

    // Side effect: when state changes (selectedCourses) by selecting in the table,
    // execute callback function (onChange) to notify clients.
    // More info: https://blog.logrocket.com/why-react-doesnt-update-state-immediately/
    useEffect(() => {
        if (onChange) {
            onChange(selectedCourses);
        }
    }, [selectedCourses]);

    const handleOnClick = (course: Course) => {
        if (selectedCourses.includes(course)) {
            setSelectedCourses(selectedCourses.filter(({ name }) => name !== course.name));
        } else {
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    return (
        <div className="col-8">
            <table className={classNames('table', { 'table-hover': clickable })}>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th className="text-center" scope="col">
                            Phase
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {courses &&
                        courses.map((course, index) => (
                            <tr
                                className={selectedCourses.includes(course) ? 'table-active' : ''}
                                key={index}
                                onClick={() => {
                                    if (clickable) {
                                        handleOnClick(course);
                                    }
                                }}
                                role={clickable ? 'button' : ''}
                            >
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td className="text-center">{course.phase}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoursesOverviewTable;
