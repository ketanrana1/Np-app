import { FILTER_FROM_DATE, FILTER_RUNNING_STATUS, FILTER_TO_DATE, RUNNING_STATUS } from "../constants/runningStatusType";


const initialState = {
    runningStatus: false,
    fromDate: null,
    toDate: null
}

export const runningStatusChanged = (state = initialState, { type, payload }) => {
    switch (type) {

        case RUNNING_STATUS:
            return state.runningStatus = payload

        default:
            return state;
    }
}

export const filterRunningStatus = (state = initialState, { type, payload }) => {
    switch (type) {

        case FILTER_FROM_DATE:
            return {...state, fromDate: payload}
        case FILTER_TO_DATE:
            return {...state, toDate: payload}
        default:
            return state;
    }
}