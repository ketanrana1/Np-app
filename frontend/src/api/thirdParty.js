import { http } from './https';
const { get } = http
export const getResponse = async () => {
    const response = await get(`https://jsonplaceholder.typicode.com/posts/100`);
    return response;
};