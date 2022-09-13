import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import LecturerService from '../../services/LecturerService';
import { Lecturer } from '../../types';
import CoursesOverviewTable from '../courses-overview-table';
import LecturersOverviewTable from './LecturersOverviewTable';
import useInterval from 'use-interval';

const LecturerOverview: React.FC = () => {
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);

    useEffect(() => {
        getLecturers();
    }, []);

    useInterval(() => {
        getLecturers();
    }, 1000);

    const getLecturers = async () => {
        const res: AxiosResponse<Lecturer[]> = await LecturerService.getAllLecturers();
        setLecturers(res.data);
    };

    return (
        <section className="row justify-content-center">
            <LecturersOverviewTable
                lecturers={lecturers}
                setSelectedLecturer={setSelectedLecturer}
            />
            {selectedLecturer && selectedLecturer.courses?.length && (
                <CoursesOverviewTable courses={selectedLecturer.courses} />
            )}
        </section>
    );
};

export default LecturerOverview;
