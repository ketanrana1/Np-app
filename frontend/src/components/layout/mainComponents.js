import Actions from "../monitor/actions/Actions";
import RunStatus from "../monitor/runStatus/RunStatus";
import Tasks from "../monitor/tasks/Tasks";


export const renderComponent = [
    {
        componentType: <RunStatus />
    },
    {
        componentType: <Tasks />
    },
    {
        componentType: <Actions />
    },
]