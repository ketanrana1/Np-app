export const thirdPartyApi = (taskTypeName: any) => {
    switch (taskTypeName) {
        case 'Netsuite_Get':
            return "https://jsonplaceholder.typicode.com/posts/1"
        case 'SFTP_File_Get':
            return "https://jsonplaceholder.typicode.com/posts/100"
        default:
            return console.log("nothing to send");
    }
}