import { LOG_STATUS } from "../constants/logStatusType";



const initialState = {
    logsStatus: {},
}

export const logsStatusChanged = (state = initialState, { type, payload }) => {
    switch (type) {

        case LOG_STATUS:
            return { ...state, logsStatus: payload }

        default:
            return state;
    }
}