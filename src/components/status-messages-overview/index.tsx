import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Course, StatusMessage } from '../../types';

type Props = {
    statusMessages: StatusMessage[];
};

const StatusMessagesOverview: React.FC<Props> = ({ statusMessages }: Props) => {
    return (
        <>
            {statusMessages && (
                <ul className="list-unstyled col-4 mb-3">
                    {statusMessages.map(({ message, type }, index) => (
                        <li
                            key={index}
                            className={classNames({
                                'text-danger': type === 'error',
                                'text-success': type === 'success',
                            })}
                        >
                            {message}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default StatusMessagesOverview;
