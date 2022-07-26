import { http } from './https';

export const runStatus = async (payload) => {
    const { data } = await http.post(`/api/add-run-status`,payload);
    return data;
};