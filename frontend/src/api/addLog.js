import { http } from './https';

export const addLogs = async (payload) => {
    const { data } = await http.post(`/api/add-log`,payload);
    return data;
};