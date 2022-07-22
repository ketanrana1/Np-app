import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
// import { REACT_APP_BACKEND_URL } from '../../../components/common/environment';
// import { toast } from 'react-toastify';
import Loader from '../../../components/field/loader';

const columns = [
  { field: 'ranAt', headerName: 'Run At', width: 200 },
  { field: 'startTime', headerName: 'Start Time', width: 200 },
  { field: 'flowName', headerName: 'Flow Name', width: 200 },
  { field: 'endTime', headerName: 'End Time', width: 200 },
];

// const rows = [
//   { id: 1, ranAt: 1236985745, startTime: 89236985745, flowName: "Flow Name", endTime: 8236985745 },
//   { id: 2, ranAt: 236985745, startTime: 5236985745, flowName: "Flow Name", endTime: 565236985745 },
//   { id: 3, ranAt: 3236985745, startTime: 7236985745, flowName: "Flow Name", endTime: 56236985745 },
//   { id: 4, ranAt: 4236985745, startTime: 6236985745, flowName: "Flow Name", endTime: 56236985745 },
//   { id: 5, ranAt: 5236985745, startTime: 87236985745, flowName: "Flow Name", endTime: 6236985745 },
//   { id: 6, ranAt: 6236985745, startTime: 5236985745, flowName: "Flow Name", endTime: 56236985745 },
//   { id: 7, ranAt: 7236985745, startTime: 56236985745, flowName: "Flow Name", endTime: 56236985745 },
//   { id: 8, ranAt: 8236985745, startTime: 6236985745, flowName: "Flow Name", endTime: 56236985745 },
//   { id: 9, ranAt: 9236985745, startTime: 54236985745, flowName: "Flow Name", endTime: 89236985745 },
//   { id: 10, ranAt: 10236985745, startTime: 86236985745, flowName: "Flow Name", endTime: 89236985745 },
//   { id: 11, ranAt: 11236985745, startTime: 54236985745, flowName: "Flow Name", endTime: 45236985745 },
//   { id: 12, ranAt: 12236985745, startTime: 546236985745, flowName: "Flow Name", endTime: 236985745 },
//   { id: 13, ranAt: 13236985745, startTime: 5236985745, flowName: "Flow Name", endTime: 6236985745 },
//   { id: 14, ranAt: 14236985745, startTime: 5236985745, flowName: "Flow Name", endTime: 2316985745 },
// ]; 

// const ktr =  [
//   {
//     "startTime": 89236985745,
//     "endTime": 8236985745,
//     "ranAt": 1236985745,
//     "flowName": "Flow Name Chnage",
//     "id": "6321e3cf-2296-4e05-a047-1e3b9eb70e2b"
//   },
//   {
//     "startTime": 5236985745,
//     "endTime": 565236985745,
//     "ranAt": 236985745,
//     "flowName": "Flow Name",
//     "id": "d1f0fad0-5468-47e9-b13e-5b07711610d7"
//   },
//   {
//     "startTime": 7236985745,
//     "endTime": 56236985745,
//     "ranAt": 3236985745,
//     "flowName": "Flow Name",
//     "id": "2ea5882e-1ca0-4bcb-beec-350fad3f3d1b"
//   },
//   {
//     "startTime": 6236985745,
//     "endTime": 56236985745,
//     "ranAt": 4236985745,
//     "flowName": "Flow Name",
//     "id": "0356a3d7-bf60-4fc3-9128-e3b979de8f63"
//   },
//   {
//     "startTime": 87236985745,
//     "endTime": 6236985745,
//     "ranAt": 5236985745,
//     "flowName": "Flow Name",
//     "id": "431df998-31d0-41f4-be3a-fdfb2c1fbc01"
//   },
//   {
//     "startTime": 5236985745,
//     "endTime": 56236985745,
//     "ranAt": 6236985745,
//     "flowName": "Flow Name",
//     "id": "54c4fd9b-eb9f-43fb-ab6f-b4f3107e33ee"
//   },
//   {
//     "startTime": 56236985745,
//     "endTime": 56236985745,
//     "ranAt": 7236985745,
//     "flowName": "Flow Name",
//     "id": "adb1f52b-5003-4104-b8ab-7dea41a30024"
//   },
//   {
//     "startTime": 6236985745,
//     "endTime": 56236985745,
//     "ranAt": 8236985745,
//     "flowName": "Flow Name",
//     "id": "de1c9354-a784-410a-a217-e3edee62e721"
//   },
//   {
//     "startTime": 54236985745,
//     "endTime": 89236985745,
//     "ranAt": 9236985745,
//     "flowName": "Flow Name",
//     "id": "52dda1e2-e96d-414f-919e-f4d65c2510f4"
//   },
//   {
//     "startTime": 86236985745,
//     "endTime": 89236985745,
//     "ranAt": 10236985745,
//     "flowName": "Flow Name",
//     "id": "36f42d30-0df3-4fc8-8f3e-9aebb0fd0f03"
//   },
//   {
//     "startTime": 54236985745,
//     "endTime": 45236985745,
//     "ranAt": 11236985745,
//     "flowName": "Flow Name",
//     "id": "b51ecb23-f779-424c-8294-67682f5ce462"
//   },
//   {
//     "startTime": 546236985745,
//     "endTime": 236985745,
//     "ranAt": 12236985745,
//     "flowName": "Flow Name",
//     "id": "b8f4aca3-e5d0-4273-8b4f-be65f22401e1"
//   },
//   {
//     "startTime": 5236985745,
//     "endTime": 6236985745,
//     "ranAt": 13236985745,
//     "flowName": "Flow Name",
//     "id": "452f7bde-f51e-47ba-94e7-6828aff78459"
//   },
//   {
//     "startTime": 5236985745,
//     "endTime": 2316985745,
//     "ranAt": 14236985745,
//     "flowName": "Flow Name",
//     "id": "03be49f8-f7e3-48e7-bc0a-a0fa8fd1a4a5"
//   }
// ]

// const rows = JSON.parse(ktr);

// console.log("KTR PARSE", rows ,ktr  )

const RunStatus = () => {

  const [loader, setLoader] = useState(false)
  const [statuses, setStatuses] = useState([])

  useEffect(() => {

    const getAllStatuses = async () => {
      try {
        setLoader(true)
        const { data } = await axios({
          method: 'get',
          url: `http://localhost:5000/api/get-run-statuses`,
          headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }
        });
      return [setStatuses(data),setLoader(false)]
        
      } catch (error) {
        return [setLoader(false),console.log(error)]
      }
    }
    getAllStatuses()
  }, [])

  // const rows = statuses 

  console.log("STATUSES", statuses);

  // const handleClick = async (row) => {
  //   try {
  //     setLoader(true)
  //     const bodyData = row.row
  //     const payload = {
  //       bodyData
  //     }
  //     const response = await axios({
  //       method: 'post',    
  //       url: `${REACT_APP_BACKEND_URL}/api/add-run-status`,
  //       headers: {
  //           'Authorization': `${sessionStorage.getItem('AccessToken')}`
  //       },
  //       data: payload              
  //     });
  //     setLoader(false)
  //     toast(response.data.message, { autoClose: 2000 });
  //   } catch (error) {
  //     setLoader(false)
  //     console.log(error);
  //   }
  // }


  return (
    <>
      <div className="monitor-table-cont">
        <h5 className="monitor-table-head">Recent Run status </h5>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={statuses}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          // onCellClick={handleClick}
          />
        </div>
      </div>
      {loader && <Loader />}
    </>
  )
}

export default RunStatus

