import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './components/layout/layout';
import NotFound from './pages/NotFound';
import Connection from './pages/Connection';
import AddConnection from './components/connection/AddConnection';
import EditConnection from './components/connection/EditConnection';
import ConnectionType from './pages/ConnectionType';
import AddConnectionType from './components/connectionType/AddConnectionType';
import EditConnectionType from './components/connectionType/EditConnectionType';
import Flow from './pages/Flow';
import AddFlow from './components/flow/AddFlow';
import EditFlow from './components/flow/EditFlow';
import Schedule from './pages/Schedule';
import AddSchedule from './components/schedule/AddSchedule';
import EditSchedule from './components/schedule/EditSchedule';
import Task from './pages/Task';
import AddTask from './components/task/AddTask';
import EditTask from './components/task/EditTask';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate replace to='/connection' />} />
        <Route path='/connection-type' element={<ConnectionType />} />
        <Route path='/connection-type/:add-connection-type' element={<AddConnectionType />} />
        <Route path='/connection-type/:edit-connection-type' element={<EditConnectionType />} />
        <Route path='/connection' element={<Connection />} />
        <Route path='/connection/:add-connection' element={<AddConnection />} />
        <Route path='/connection/:edit-connection' element={<EditConnection />} />
        <Route path='/task' element={<Task />} />
        <Route path='/task/:add-task' element={<AddTask />} />
        <Route path='/task/:edit-task' element={<EditTask />} />
        <Route path='/flow' element={<Flow />} />
        <Route path='/flow/:add-flow' element={<AddFlow />} />
        <Route path='/flow/:edit-flow' element={<EditFlow />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/schedule/:add-schedule' element={<AddSchedule />} />
        <Route path='/schedule/:edit-schedule' element={<EditSchedule />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;