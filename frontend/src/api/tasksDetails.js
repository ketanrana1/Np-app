import { http } from "./https";
const { get, post } = http

export const getTaskStatus = async (id) => {
    const response = await get(`get-task-statuses/${id}`);
    return response;
};

export const addTaskStatus = async (payload) => {
    const response = await post(`add-task-status`,payload);
    return response;
};