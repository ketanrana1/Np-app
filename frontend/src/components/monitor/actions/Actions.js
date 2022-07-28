import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import { logStatus } from '../../../redux/actions/logStatusAction';
import { getActionStatus } from '../../../api/actions';

const columns = [
  { field: 'ranAt', headerName: 'Run At', width: 200 },
  { field: 'startTime', headerName: 'Start Time', width: 200 },
  { field: 'actionName', headerName: 'Action Name', width: 200 },
  { field: 'endTime', headerName: 'End Time', width: 200 },
];

const Actions = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state?.taskStatusChanged?.taskStatus)

  const [filterAction, setFilterAction] = useState([])

  useEffect(() => { getActionLists(); return () =>  setFilterAction([]) }, [state])

  const getActionLists = async () => {
    if (!state?.id) return
    const { data } = await getActionStatus(state?.id)

    data?.map((action) => {

      const { startTime, ranAt, endTime, actions, id: actionId } = action
      const filteredList = actions.map((act, index) => {
        const { actionName, logDate, logDescription } = act
        return { id: index + 1, actionName, startTime, endTime, logDate, logDescription, actionId, ranAt }
      })

      setFilterAction(filteredList)
    })
  }

  const handleClick = ({ row }) => dispatch(logStatus(row))
  
  return (
    <>
      <div className="monitor-table-cont">
        <h5 className="monitor-table-head">Actions </h5>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filterAction}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onCellClick={handleClick}
          />
        </div>
      </div>
    </>
  )
}

export default Actions

