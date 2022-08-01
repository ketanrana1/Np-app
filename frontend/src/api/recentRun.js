import { http } from './https';
const { get, post } = http

export const runStatus = async (payload) => {
    const response = await post(`/add-run-status`, payload);
    return response;
};
export const getRunStatus = async () => {
    const response = await get(`get-run-statuses`);
    return response;
};