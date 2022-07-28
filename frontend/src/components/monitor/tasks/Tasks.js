import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../../../components/common/environment';

import Loader from '../../../components/field/loader';
import { useDispatch, useSelector } from 'react-redux';
import { taskStatusAction } from '../../../redux/actions/taskStatusesAction';
import { logStatus } from '../../../redux/actions/logStatusAction';
const columns = [
  { field: 'ranAt', headerName: 'Run At', width: 200 },
  { field: 'startTime', headerName: 'Start Time', width: 200 },
  { field: 'taskName', headerName: 'Task Name', width: 200 },
  { field: 'endTime', headerName: 'End Time', width: 200 },
];
const Tasks = () => {
  const state = useSelector((state) => state?.flowListChanged)
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [taskStatus, setTaskStatus] = useState([])

  useEffect(() => {
    const { flowId } = state?.flowList
    const getTaskLists = async () => {
      try {
        setLoader(true)
        const { data } = await axios({
          method: 'get',
          url: `${REACT_APP_BACKEND_URL}/api/get-task-statuses/${flowId}`,
          headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }
        });
        return [dispatch(logStatus(data[0] && {...data[0],taskType:"task"})), dispatch(taskStatusAction(data[0])), setTaskStatus(data), setLoader(false)]

      } catch (error) {
        return [setLoader(false), console.log(error)]
      }
    }
    getTaskLists()
  }, [state])

  const handleClick = ({ row }) => {
    dispatch(logStatus({...row,taskType:"task"}))
    dispatch(taskStatusAction(row))
  }

  return (
    <div className="monitor-table-cont">
      <h5 className="monitor-table-head">Tasks </h5>
      <div style={{ height: 400, width: '100%' }}>
        {taskStatus && <DataGrid
          rows={taskStatus}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={handleClick}
        />}
      </div>
      {loader && <Loader />}
    </div>
  )
}

export default Tasks

