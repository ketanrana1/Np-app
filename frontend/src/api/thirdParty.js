import { http } from './https';

export const thirdParty = async () => {
    const { data } = await http.get(`https://jsonplaceholder.typicode.com/posts/1`);
    return data;
};