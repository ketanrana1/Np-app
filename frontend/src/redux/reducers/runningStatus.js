import { RUNNING_STATUS } from "../constants/runningStatusType";


const initialState = {
    runningStatus: false
}

export const runningStatusChanged = (state = initialState, { type, payload }) => {
    switch (type) {
    
        case RUNNING_STATUS:
            return state.runningStatus = payload

        default:
            return state;
    }
}