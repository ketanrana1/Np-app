import { combineReducers } from 'redux'
import { runningStatusChanged } from './reducers/runningStatus'
import { taskStatusChanged } from './reducers/taskStatuses'
import { logsStatusChanged } from './reducers/logStatus'
import { flowListChanged } from './reducers/flowList'
const rootReducers = combineReducers({
    runningStatusChanged,
    taskStatusChanged,
    logsStatusChanged,
    flowListChanged,
})

export default rootReducers
