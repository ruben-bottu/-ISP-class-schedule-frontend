import React, { useState } from 'react';
import { Lecturer } from '../../types';

type Props = {
    lecturers: Lecturer[];
    setSelectedLecturer: (lecturer: Lecturer) => void;
};

const LecturersOverviewTable: React.FC<Props> = ({ lecturers, setSelectedLecturer }: Props) => {
    const [nameFilter, setNameFilter] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    return (
        <>
            <div className="col-4 mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by name"
                    onChange={(event) => setNameFilter(event.target.value)}
                />
            </div>
            <div className="w-100 d-none d-md-block" />
            <div className="col-6">
                {lecturers && (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th className="text-center" scope="col">
                                    Courses
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {lecturers &&
                                lecturers
                                    .filter(({ name }) =>
                                        name.toLowerCase().includes(nameFilter.toLowerCase())
                                    )
                                    .map((lecturer, index) => (
                                        <tr
                                            className={index === currentIndex ? 'table-active' : ''}
                                            onClick={() => {
                                                setSelectedLecturer(lecturer);
                                                setCurrentIndex(index);
                                            }}
                                            key={index}
                                            role="button"
                                        >
                                            <td>{lecturer.name}</td>
                                            <td className="text-center">
                                                {lecturer.courses?.length || 0}
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default LecturersOverviewTable;
