import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { ClassScheduleProposal, Course } from '../../types';

type Props = {
    proposals: ClassScheduleProposal[];
    handleOnClick?: (proposal: ClassScheduleProposal) => void;
};

const ClassScheduleProposalsOverviewList: React.FC<Props> = ({
    proposals,
    handleOnClick = () => {},
}: Props) => {
    return (
        <>
            {proposals && !!proposals.length && (
                <ul className="list-group">
                    {proposals.map((proposal, index) => (
                        <li
                            key={index}
                            onClick={() => handleOnClick(proposal)}
                            role="button"
                            className="mb-md-2 list-group-item border border-primary border-2 rounded"
                        >
                            <p className="my-md-4 ms-md-2 fs-4">
                                Number of overlaps: {proposal.overlapCount}
                            </p>
                            <table className="table table-hover table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">Course Name</th>
                                        <th scope="col">Class Group Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proposal.combination.map(({ course, classGroup }) => (
                                        <tr>
                                            <td>{course.name}</td>
                                            <td>{classGroup.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default ClassScheduleProposalsOverviewList;
