import { FLOW_LIST } from "../constants/flowListType";




const initialState = {
    flowList: [],
}

export const flowListChanged = (state = initialState, { type, payload }) => {
    switch (type) {

        case FLOW_LIST:
            return { ...state, flowList: payload }

        default:
            return state;
    }
}