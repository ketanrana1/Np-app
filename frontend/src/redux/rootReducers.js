import { combineReducers } from 'redux'
import { runningStatusChanged } from './reducers/runningStatus'

const rootReducers = combineReducers({
    runningStatusChanged
})

export default rootReducers
