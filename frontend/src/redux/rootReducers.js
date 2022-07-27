import { combineReducers } from 'redux'
import { runningStatusChanged } from './reducers/runningStatus'
import { taskStatusChanged } from './reducers/taskStatuses'
import { logsStatusChanged } from './reducers/logStatus'
const rootReducers = combineReducers({
    runningStatusChanged,
    taskStatusChanged,
    logsStatusChanged,
})

export default rootReducers
