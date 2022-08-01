import { combineReducers } from 'redux'
import { runningStatusChanged, filterRunningStatus } from './reducers/runningStatus'
import { taskStatusChanged } from './reducers/taskStatuses'
import { logsStatusChanged } from './reducers/logStatus'
import { flowListChanged } from './reducers/flowList'
const rootReducers = combineReducers({
    runningStatusChanged,
    taskStatusChanged,
    logsStatusChanged,
    flowListChanged,
    filterRunningStatus
})

export default rootReducers
