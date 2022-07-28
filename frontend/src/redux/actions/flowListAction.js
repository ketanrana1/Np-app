import { FLOW_LIST } from "../constants/flowListType"



export const flowLists = (payload) => {
    return (
    {
        type: FLOW_LIST,
        payload
    }
)}