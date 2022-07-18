import React from 'react'
import FlowList from './flowList/FlowList'
import RunStatus from './runStatus/RunStatus'
import Tasks from './tasks/Tasks'
import Actions from './actions/Actions'
import Log from './log/Log'

const Monitor = () => {
  return (
    <div className="monitor-cont">
        Monitor
        <FlowList />
        <RunStatus />
        <Tasks />
        <Actions />
        <Log />
    </div>
  )
}

export default Monitor