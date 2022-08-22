import axios from "axios";

export const SFTP_File_GET = async () => {
    const { data } = await axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/posts/100`,
    });
    return { data }
}

export const Netsuite_GET = async () => {
    const { data } = await axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/posts/1`,
    });
    return { data }
}
