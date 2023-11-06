import React, {  } from 'react';
import { Course } from '../../types';

type Props = {
    courses: Course[];
    handleOnClick?: (course: Course) => void;
};

const CoursesOverviewList: React.FC<Props> = ({ courses, handleOnClick = () => {} }: Props) => {
    return (
        <>
            {courses && !!courses.length && (
                <ul className="list-group position-absolute overflow-auto w-100">
                    {courses.map((course, index) => (
                        <li
                            key={index}
                            onClick={() => handleOnClick(course)}
                            className="list-group-item list-group-item-action"
                        >
                            {course.name}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default CoursesOverviewList;
