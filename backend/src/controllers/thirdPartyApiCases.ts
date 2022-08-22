import { Netsuite_GET, SFTP_File_GET } from '../constants/thirdPartyApi'
export const thirdPartyApiCases = (taskTypeName: any) => {
    switch (taskTypeName) {
        case 'Netsuite_Get':
            return Netsuite_GET()
        case 'SFTP_File_Get':
            return SFTP_File_GET()
        default:
            return console.log("nothing to send");
    }
}