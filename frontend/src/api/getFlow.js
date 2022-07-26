import { http } from './https';

export const getFlow = async (id) => {
    const { data } = await http.get(`/api/get-flow/${id}`);
    return data;
};