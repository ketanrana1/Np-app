import { http } from "./https";
const { get, post } = http

export const getTaskStatus = async (id) => {
    const response = await get(`get-task-statuses/${id}`);
    return response;
};