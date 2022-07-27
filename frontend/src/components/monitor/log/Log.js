import * as React from 'react';
import react, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../../../components/common/environment';
import Loader from '../../field/loader';
const TASK_LOGS = `${REACT_APP_BACKEND_URL}/api/get-task-status-log-details`
const ACTION_LOGS = `${REACT_APP_BACKEND_URL}/api/get-single-action-log-details`
const Log = () => {

  const { logsStatus } = useSelector((state) => state?.logsStatusChanged)
  const [logDetails, setLogDetails] = useState([])
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    console.log("logsStatus", logsStatus)

    if (!logsStatus) return
    const { id, taskType, actionId, actionName } = logsStatus
    if (!id) return
    const getLogs = async () => {
      try {
        setLoader(true)
        const { data } = await axios({
          method: 'get',
          url: taskType ? `${TASK_LOGS}/${id}` : `${ACTION_LOGS}/${actionName}/${actionId}`,
          headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }
        });
        const logList = taskType ? data : data.map((des) => des.actions)
        setLogDetails(logList)
        setLoader(false)
      } catch (error) {
        return [setLoader(false), console.log(error)]
      }
    }
    getLogs()

    return () => {

    }
  }, [logsStatus])


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
              {logDetails && logDetails?.map(({ logDate, logDescription }, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{logDate}</TableCell>
                  <TableCell>{logDescription}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {loader && <Loader />}
    </div>
  )
}

export default Log