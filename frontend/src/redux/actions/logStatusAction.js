import { IS_LOG_CLEAR, LOG_STATUS } from "../constants/logStatusType"


export const logStatus = (payload) => {
    return (
    {
        type: LOG_STATUS,
        payload
    }
)}
export const isLogClear = (payload) => {
    return (
    {
        type: IS_LOG_CLEAR,
        payload
    }
)}