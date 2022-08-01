import { FILTER_FROM_DATE, FILTER_TO_DATE, RUNNING_STATUS, } from "../constants/runningStatusType";

export const runningStatus = (payload) => {
    return (
    {
        type: RUNNING_STATUS,
        payload
    }
)}
export const filterFromDate = (payload) => {
    return (
    {
        type: FILTER_FROM_DATE,
        payload
    }
)}

export const filterToDate = (payload) => {
    return (
    {
        type: FILTER_TO_DATE,
        payload
    }
)}

