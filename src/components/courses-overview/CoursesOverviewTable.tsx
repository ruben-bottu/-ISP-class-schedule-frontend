import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Course } from '../../types';

type Props = {
    courses: Course[];
    handleOnClick?: (course: Course) => void;
};

const CoursesOverviewTable: React.FC<Props> = ({ courses, handleOnClick = () => {} }: Props) => {
    return (
        <>
            {courses && !!courses.length && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index} onClick={() => handleOnClick(course)} role="button">
                                <td>{course.id}</td>
                                <td>{course.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default CoursesOverviewTable;
