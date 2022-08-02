import { http } from "./https";
const { get, post } = http

export const addConnection = async (payload) => {
    const response = await post(`add-connection`,payload);
    return response;
};

export const addConnectionType = async (payload) => {
    const response = await post(`add-connection-type`,payload);
    return response;
};