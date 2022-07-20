import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
const handleClick = (row) => {
  
 console.log("Row Data", row.row)
}

const columns = [
  { field: 'ranAt', headerName: 'Run At', width: 200 },
  { field: 'startTime', headerName: 'Start Time', width: 200 },
  { field: 'flowName', headerName: 'Flow Name', width: 200 },
  { field: 'endTime', headerName: 'End Time', width: 200 },

];

const rows = [
  { id: 1, ranAt: 1236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 2, ranAt: 236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 3, ranAt: 3236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 4, ranAt: 4236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 5, ranAt: 5236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 6, ranAt: 6236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 7, ranAt: 7236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 8, ranAt: 8236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 9, ranAt: 9236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 10, ranAt: 10236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 11, ranAt: 11236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 12, ranAt: 12236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 13, ranAt: 13236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
  { id: 14, ranAt: 14236985745, startTime: 236985745, flowName: "Flow Name", endTime: 236985745 },
];

const Tasks = () => {
  return (
    <div className="monitor-table-cont">
      <h5 className="monitor-table-head">Tasks </h5>  
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={handleClick}
        />
      </div>
    </div>

    
  )
}

export default Tasks

