import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Course } from '../../types';

type Props = {
    courses: Course[];
    handleOnClick?: (course: Course) => void;
};

const CoursesOverviewList: React.FC<Props> = ({ courses, handleOnClick = () => {} }: Props) => {
    return (
        <>
            {courses && !!courses.length && (
                <ul className="list-group">
                    {courses.map((course, index) => (
                        <li
                            key={index}
                            onClick={() => handleOnClick(course)}
                            role="button"
                            className="list-group-item"
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
