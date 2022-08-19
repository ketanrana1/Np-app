import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '../../common/muiImports'
import { useSelector } from 'react-redux';
import { getTaskActions, getTaskLogs } from '../../../api/logs';

const Log = () => {
  const selector = useSelector((state) => state?.logsStatusChanged)

  const { logsStatus,isLoggedClear } = selector

  const [logDetails, setLogDetails] = useState([])

  useEffect(() => { getLogs(); return () => { setLogDetails([]) } }, [logsStatus,isLoggedClear])

  const getLogs = async () => {
    if (!logsStatus) return
    const { id, taskType, actionId, actionName } = logsStatus
    if (!id) return

    const { data } = taskType ? await getTaskLogs(id) : await getTaskActions(actionName, actionId)
    setLogDetails(taskType ? data : data.map((des) => des.actions))
  }
  return (
    <div className="monitor-table-cont">
      <h5 className="monitor-table-head">Logs </h5>
      <div className="monitor-log-cont">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Log Date</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logDetails && logDetails?.map((logs, index) =>
              (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{logs?.logDate}</TableCell>
                  <TableCell>{logs?.logDescription}</TableCell>
                </TableRow>
              )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Log