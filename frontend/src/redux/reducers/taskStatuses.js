import { TASK_STATUSES_SPECIFIC_LIST } from "../constants/taskStatusesType"


const initialState = {
    taskStatus: [],
}

export const taskStatusChanged = (state = initialState, { type, payload }) => {
    switch (type) {
    
        case TASK_STATUSES_SPECIFIC_LIST:
            return {...state,taskStatus: payload}

        default:
            return state;
    }
}