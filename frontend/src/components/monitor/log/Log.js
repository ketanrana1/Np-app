import * as React from 'react';
import react, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loader from '../../../components/field/loader';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../../../components/common/environment';
import { useSelector } from 'react-redux';


const Log = () => {
  const state = useSelector((state)=>state?.runningStatusChanged)
  const [loader, setLoader] = useState(false)
  const [logs, setLogs] = useState([])

  useEffect(() => {

    const getAllLogs = async () => {
      try {
        setLoader(true)
        const { data } = await axios({
          method: 'get',
          url: `${REACT_APP_BACKEND_URL}/api/get-logs`,
          headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }
        });
      setLogs(data)
      setLoader(false)
        
      } catch (error) {
        setLoader(false)
        console.log(error)
      }
    }
    getAllLogs()
  }, [state])
  function createData(logDate, description) {
    return { logDate, description };
  }
  
  const rows = logs.map(({logDate, description})=>createData(logDate, description))

  return (
    <div className="monitor-table-cont">
      <h5 className="monitor-table-head">Logs </h5>  
      <div className="monitor-log-cont">
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Log Date</TableCell>
              <TableCell align="left">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { rows.map(({logDate,description},index)=>(
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
               
              <TableCell align="left">{logDate}</TableCell>
              <TableCell align="left">{description}</TableCell>
              </TableRow>
            )) } 
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      {loader && <Loader />}
    </div>
  )
}

export default Log