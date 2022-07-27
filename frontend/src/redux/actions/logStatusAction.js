import { LOG_STATUS } from "../constants/logStatusType"


export const logStatus = (payload) => {
    return (
    {
        type: LOG_STATUS,
        payload
    }
)}