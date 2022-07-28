import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { taskStatusAction } from '../../../redux/actions/taskStatusesAction';
import { logStatus } from '../../../redux/actions/logStatusAction';
import { getTaskStatus } from '../../../api/tasksDetails';

const columns = [
  { field: 'ranAt', headerName: 'Run At', width: 200 },
  { field: 'startTime', headerName: 'Start Time', width: 200 },
  { field: 'taskName', headerName: 'Task Name', width: 200 },
  { field: 'endTime', headerName: 'End Time', width: 200 },
  { field: 'log', headerName: 'Log Des', width: 200 }
];

const Tasks = () => {
  const state = useSelector((state) => state?.flowListChanged)
  const dispatch = useDispatch()

  const [taskStatus, setTaskStatus] = useState([])
  const [isHiglight, setIsHighLight] = useState("")
  useEffect(() => { getTaskList() }, [state])

  const getTaskList = async () => {
    const { flowId } = state?.flowList
    if (!flowId) return
    const { data } = await getTaskStatus(flowId)

    return [
      dispatch(logStatus(data[0] && {
        ...data[0],
        taskType: "task"
      })),
      dispatch(taskStatusAction(data[0])),
      setTaskStatus(data),
      setIsHighLight(data[0]?.id)
    ]
  }

  const handleClick = ({ row }) => {
    return [
      dispatch(logStatus({ ...row, taskType: "task" })),
      dispatch(taskStatusAction(row)),
      setIsHighLight(row.id)
    ]
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
          selectionModel={isHiglight}
        />}
      </div>
    </div>
  )
}

export default Tasks

