import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../../../components/common/environment';
import { toast } from 'react-toastify';
import Loader from '../../../components/field/loader';

const columns = [
  { field: 'ranAt', headerName: 'Run At', width: 180 },
  { field: 'startTime', headerName: 'Start Time', width: 180 },
  { field: 'flowName', headerName: 'Flow Name', width: 180 },
  { field: 'endTime', headerName: 'End Time', width: 180 },
  { field: 'status', headerName: 'Status', width: 180 },
];

// const rows = [
//   { id: 1, ranAt: 1236985745, startTime: 89236985745, flowName: "Flow Name", endTime: 8236985745, status: "In progress" },
//   { id: 2, ranAt: 236985745, startTime: 5236985745, flowName: "Flow Name", endTime: 565236985745, status: "Completed" },
//   { id: 3, ranAt: 3236985745, startTime: 7236985745, flowName: "Flow Name", endTime: 56236985745, status: "Rejected" },
//   { id: 4, ranAt: 4236985745, startTime: 6236985745, flowName: "Flow Name", endTime: 56236985745, status: "In progress" },
//   { id: 5, ranAt: 5236985745, startTime: 87236985745, flowName: "Flow Name", endTime: 6236985745, status: "Completed" },
//   { id: 6, ranAt: 6236985745, startTime: 5236985745, flowName: "Flow Name", endTime: 56236985745, status: "Rejected" },
//   { id: 7, ranAt: 7236985745, startTime: 56236985745, flowName: "Flow Name", endTime: 56236985745, status: "In progress" },
//   { id: 8, ranAt: 8236985745, startTime: 6236985745, flowName: "Flow Name", endTime: 56236985745, status: "Completed" },
//   { id: 9, ranAt: 9236985745, startTime: 54236985745, flowName: "Flow Name", endTime: 89236985745, status: "Rejected" },
//   { id: 10, ranAt: 10236985745, startTime: 86236985745, flowName: "Flow Name", endTime: 89236985745, status: "In progress" },
//   { id: 11, ranAt: 11236985745, startTime: 54236985745, flowName: "Flow Name", endTime: 45236985745, status: "Completed" },
//   { id: 12, ranAt: 12236985745, startTime: 546236985745, flowName: "Flow Name", endTime: 236985745, status: "Rejected" },
//   { id: 13, ranAt: 13236985745, startTime: 5236985745, flowName: "Flow Name", endTime: 6236985745, status: "In progress" },
//   { id: 14, ranAt: 14236985745, startTime: 5236985745, flowName: "Flow Name", endTime: 2316985745, status: "Completed" },
// ]; 


const RunStatus = () => {

  const [loader, setLoader] = useState(false)
  const [statuses, setStatuses] = useState([])

  useEffect(() => {

    const getAllStatuses = async () => {
        try {
            setLoader(true)
            const { data } = await axios({
                method: 'get',    
                url: `${REACT_APP_BACKEND_URL}/api/get-run-statuses`,
                headers: {
                    'Authorization': `${sessionStorage.getItem('AccessToken')}`
                }        
              });
              console.log("DATA", data);
              setStatuses(data)    
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log(error);
        }
    }
    getAllStatuses()
}, [])



  const handleClick = async (row) => {
    try {
      setLoader(true)
      const bodyData = row.row
      const payload = {
        bodyData
      }
      const response = await axios({
        method: 'post',    
        url: `${REACT_APP_BACKEND_URL}/api/add-run-status`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        },
        data: payload              
      });
      setLoader(false)
      toast(response.data.message, { autoClose: 2000 });
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  }


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
            onCellClick={handleClick}
          />
        </div>
      </div>
      {loader && <Loader />}
    </>   
  )
}

export default RunStatus

