import axios from '../axios';
import { Course, ClassScheduleProposal } from '../types';

const getProposals = (courses: Course[]) => {
    const ids = courses.map(({id}) => id).join(',')
    return axios.get<ClassScheduleProposal[]>(`${process.env.CLASS_SCHEDULE_SUBFOLDER}${process.env.PROPOSALS_SUBFOLDER}/${ids}`);
}

const ClassScheduleService = {
    getProposals,
};

export default ClassScheduleService;