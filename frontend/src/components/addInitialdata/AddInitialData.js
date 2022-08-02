import Connections from "../../utils/jsonFiles/connections.json"
import ConnectionTypes from "../../utils/jsonFiles/connectionTypes.json"
import Tasks from "../../utils/jsonFiles/tasks.json"
import TaskTypes from "../../utils/jsonFiles/taskTypes.json"
import { addTask, addTaskType } from '../../api/tasksDetails';
import { addConnection, addConnectionType } from '../../api/connections';

const AddInitialData = () => {
  const hasBeenLoaded = localStorage.getItem('hasBeenLoaded');

  if (hasBeenLoaded === null && sessionStorage.getItem('Auth key')) {
    TaskTypes.map(async (item) => await addTaskType(item))

    Tasks.map(async (item) => await addTask(item))

    ConnectionTypes.map(async (item) => await addConnectionType(item))

    Connections.map(async (item, index) => await addConnection(item))

    localStorage.setItem('hasBeenLoaded', 'true')
  }
}

export default AddInitialData