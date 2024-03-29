import { http } from "./https";
const { get, post } = http

export const addTask = async (payload) => {
    const response = await post(`add-task`,payload);
    return response;
};

export const addTaskType = async (payload) => {
    const response = await post(`add-task-type`,payload);
    return response;
};

export const getTaskStatus = async (id) => {
    const response = await get(`get-task-statuses/${id}`);
    return response;
};

export const addTaskStatus = async (payload) => {
    const response = await post(`add-task-status`,payload);
    return response;
};

export const getTaskType = async (name) => {
    const response = await get(`/get-task-type-name/${name}`);
    return response;
};


