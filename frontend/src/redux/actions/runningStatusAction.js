import { RUNNING_STATUS } from "../constants/runningStatusType";

export const runningStatus = (payload) => {
    return (
    {
        type: RUNNING_STATUS,
        payload
    }
)}


