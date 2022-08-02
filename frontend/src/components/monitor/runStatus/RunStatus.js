import React, { useState, useEffect, useLayoutEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { flowLists } from '../../../redux/actions/flowListAction';
import { getRunStatus } from '../../../api/recentRun';
import { filterDate } from '../../field/dateFormat';

const columns = [
  { field: 'flowName', headerName: 'Flow Name', width: 230 },
  { field: 'status', headerName: 'Status', width: 230 },
  { field: 'endTime', headerName: 'End Time', width: 230 },
  { field: 'ranAt', headerName: 'Run At', width: 230 },
];

const RunStatus = () => {
  const selector = useSelector((state) => state)
  const { runningStatusChanged, filterRunningStatus: { fromDate, toDate } } = selector

  const dispatch = useDispatch()
  const [statuses, setStatuses] = useState([])
  const [filterList, setFilterList] = useState([])
  const [isHiglight, setIsHighLight] = useState("")

  useEffect(() => { getAllStatuses() }, [runningStatusChanged])

  useEffect(() => {
    const filterList = statuses.filter(
      user => {
        const { ranAt } = user
        return filterDate(ranAt, fromDate, toDate)
      }
    )
    if (toDate && fromDate) {
      setFilterList(filterList)
      dispatch(flowLists(filterList[0]))
    }

  }, [fromDate, toDate])

  const getAllStatuses = async () => {
    const { data } = await getRunStatus()
    const currentRunStatus = data.reverse()
    currentRunStatus[0]?.flowId && dispatch(flowLists(currentRunStatus[0]))
    return [
      setFilterList(currentRunStatus),
      setStatuses(currentRunStatus),
      setIsHighLight(currentRunStatus[0]?.id)
    ]
  }

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
            rows={filterList}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onCellClick={handleClick}
            selectionModel={isHiglight}
          />
        </div>
      </div>
    </>
  )
}

export default RunStatus

