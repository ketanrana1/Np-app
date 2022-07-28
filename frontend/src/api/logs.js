import { http } from './https';
const { get, post } = http

export const addLogs = async (payload) => {
    const { data } = await post(`/api/add-log`, payload);
    return data;
};

export const getTaskLogs = async (id) => {
    const response = await get(`get-task-status-log-details/${id}`);
    return response;
};

export const getTaskActions = async (name, id) => {
    const response = await get(`get-single-action-log-details/${name}/${id}`);
    return response;
};

export const clearTaskLogs = async (id) => {
    const response = await post(`edit-task-log-status/${id}`,);
    return response;
};

export const clearTaskActions = async (name,id) => {
    const response = await post(`edit-action-log-status/${id}/${name}`,);
    return response;
};

