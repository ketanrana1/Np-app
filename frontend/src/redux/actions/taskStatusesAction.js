import { TASK_STATUSES_SPECIFIC_LIST } from "../constants/taskStatusesType"


export const taskStatusAction = (payload) => {
    return (
    {
        type: TASK_STATUSES_SPECIFIC_LIST,
        payload
    }
)}