import React, { useState, useEffect, useLayoutEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../../../components/common/environment';
import { toast } from 'react-toastify';
import Loader from '../../../components/field/loader';
import { useDispatch, useSelector } from 'react-redux';
import { flowLists } from '../../../redux/actions/flowListAction';


const columns = [
  { field: 'ranAt', headerName: 'Run At', width: 180 },
  { field: 'startTime', headerName: 'Start Time', width: 180 },
  { field: 'flowName', headerName: 'Flow Name', width: 180 },
  { field: 'endTime', headerName: 'End Time', width: 180 },
  { field: 'status', headerName: 'Status', width: 180 },
];

const RunStatus = () => {
  const state = useSelector((state) => state?.runningStatusChanged)
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [statuses, setStatuses] = useState([])
  const [isHiglight, setIsHighLight] = useState("")

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
        const currentRunStatus = data.reverse()
        currentRunStatus[0]?.flowId && dispatch(flowLists(currentRunStatus[0]))
        setStatuses(currentRunStatus)
        setIsHighLight(currentRunStatus[0]?.id)
        setLoader(false)

      } catch (error) {
        setLoader(false)
        console.log(error)
      }
    }
    getAllStatuses()
  }, [state])


  const handleClick = async ({ row }) => {
    dispatch(flowLists(row))
    setIsHighLight(row.id)
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
            selectionModel={isHiglight}
          />
        </div>
      </div>
      {loader && <Loader />}
    </>
  )
}

export default RunStatus

