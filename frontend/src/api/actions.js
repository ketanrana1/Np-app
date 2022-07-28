import { http } from "./https";
const { get, post } = http

export const getActionStatus = async (id) => {
    const response = await get(`get-task-status-details/${id}`);
    return response;
};
