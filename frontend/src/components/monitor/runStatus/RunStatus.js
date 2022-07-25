import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../../../components/common/environment';
import { toast } from 'react-toastify';
import Loader from '../../../components/field/loader';
import { useSelector } from 'react-redux';

const columns = [
  { field: 'ranAt', headerName: 'Run At', width: 180 },
  { field: 'startTime', headerName: 'Start Time', width: 180 },
  { field: 'flowName', headerName: 'Flow Name', width: 180 },
  { field: 'endTime', headerName: 'End Time', width: 180 },
  { field: 'status', headerName: 'Status', width: 180 },
];

const RunStatus = () => {
  const state = useSelector((state)=>state?.runningStatusChanged)
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
  }, [state])

  // const rows = statuses 

  console.log("STATUSES", statuses);

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
          // onCellClick={handleClick}
          />
        </div>
      </div>
      {loader && <Loader />}
    </>
  )
}

export default RunStatus

