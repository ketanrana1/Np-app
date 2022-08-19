import { http } from './https';

export const getFlow = async () => {
    const response = await http.get(`/get-flow`);
    return response;
};
