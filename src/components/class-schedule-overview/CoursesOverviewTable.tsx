import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Course } from '../../types';
import deleteImg from '../../images/garbage-bin.svg';

type Props = {
    courses: Course[];
    handleOnDelete?: (course: Course) => void;
};

const CoursesOverviewTable: React.FC<Props> = ({ courses, handleOnDelete = () => {} }: Props) => {
    return (
        <>
            {courses && !!courses.length && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Course Name</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.name}</td>
                                <td
                                    onClick={() => handleOnDelete(course)}
                                    role="button"
                                    className="d-flex justify-content-center"
                                >
                                    <img
                                        src={deleteImg}
                                        alt="Delete"
                                        className="img-fluid"
                                        style={{ width: '2rem' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default CoursesOverviewTable;
