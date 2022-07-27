import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../../../components/common/environment';
import { toast } from 'react-toastify';
import Loader from '../../../components/field/loader';
import { useDispatch, useSelector } from 'react-redux';
import { logStatus } from '../../../redux/actions/logStatusAction';

const columns = [
  { field: 'ranAt', headerName: 'Run At', width: 200 },
  { field: 'startTime', headerName: 'Start Time', width: 200 },
  { field: 'actionName', headerName: 'Action Name', width: 200 },
  { field: 'endTime', headerName: 'End Time', width: 200 },
];


const Actions = () => {
  const state = useSelector((state) => state?.taskStatusChanged?.taskStatus)
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [actionStatus, setActionStatus] = useState([])
  const [filterAction, setFilterAction] = useState([])
  useEffect(() => {
    const getTaskLists = async () => {
      try {
        setLoader(true)
        const { data } = await axios({
          method: 'get',
          url: `${REACT_APP_BACKEND_URL}/api/get-task-status-details/${state?.id}`,
          headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }
        });

        data?.map((action) => {
          const { startTime, endTime, actions, id } = action
          const filteredList = actions.map((act, index) => {
            const { actionName, logDate, logDescription } = act
            return { id: index, actionName, startTime, endTime, logDate, logDescription }
          })

          setFilterAction(filteredList)
        })

        setActionStatus(data)
        setLoader(false)

      } catch (error) {
        setLoader(false)
        console.log(error)
      }
    }
    getTaskLists()
    return () => {
      setFilterAction([])
    }

  }, [state])

  const handleClick = ({row}) => {
    dispatch(logStatus([row]))
  }
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
      {loader && <Loader />}
    </>
  )
}

export default Actions

