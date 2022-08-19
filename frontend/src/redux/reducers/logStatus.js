import { IS_LOG_CLEAR, LOG_STATUS } from "../constants/logStatusType";



const initialState = {
    logsStatus: {},
    isLoggedClear: null
}

export const logsStatusChanged = (state = initialState, { type, payload }) => {
    switch (type) {

        case LOG_STATUS:
            return { ...state, logsStatus: payload }
        case IS_LOG_CLEAR:
            return { ...state, isLoggedClear: payload }
        default:
            return state;
    }
}