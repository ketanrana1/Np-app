import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Layout from './components/layout/layout';
import LoginLayout from './components/layout/LoginLayout';
import MonitorLayout from './components/layout/MonitorLayout'
import NotFound from './pages/NotFound';
import Connection from './pages/Connection';
import AddConnection from './components/connection/AddConnection';
import AddConnectionType from './components/connectionType/AddConnectionType';
import Flow from './pages/Flow';
import AddFlow from './components/flow/AddFlow';
import EditFlow from './components/flow/EditFlow';
import Schedule from './pages/Schedule';
import AddSchedule from './components/schedule/AddSchedule';
import EditSchedule from './components/schedule/EditSchedule';
import Task from './pages/Task';
import AddTask from './components/task/AddTask';
import EditTask from './components/task/EditTask';
import Login from './pages/Login';
import { useEffect } from 'react';
import Register from './pages/Register';
import AddTaskType from './components/taskType/AddTaskType';
import ViewDetails from './pages/ViewDetails';
import TaskType from './pages/TaskType';
import EditTaskType from './components/taskType/EditTaskType';
import ConnectionType from './pages/ConnectionType';
import EditConnectionType from './components/connectionType/EditConnectionType';
import Monitor from './components/monitor/monitor';

function App() {
  
  let location = useLocation();
  function RequireAuth() {
    const isAuth = sessionStorage.getItem('Auth key')
    if (!isAuth) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  useEffect(() => { RequireAuth() }, [])

  return (
    <Routes>
      <Route path='/' element={<RequireAuth><Navigate replace to='/monitor' /></RequireAuth>} />

      <Route path='/connection-type' element={<Layout><ConnectionType /></Layout>} />
      <Route path='/connection-type/:add-connection-type' element={<Layout><AddConnectionType /></Layout>} />
      <Route path='/connection-type/view-connection-type/:id' element={<Layout><ViewDetails /></Layout>} />
      <Route path='/connection-type/edit-connection-type/:id' element={<Layout><EditConnectionType /></Layout>} />

      <Route path='/connection' element={<Layout><Connection /></Layout>} />
      <Route path='/connection/:add-connection' element={<Layout><AddConnection /></Layout>} />
      <Route path='/register-user' element={<Layout><Register /></Layout>} />

      <Route path='/task' element={<Layout><Task /></Layout>} />
      <Route path='/task/edit-task/:id' element={<Layout><EditTask /></Layout>} />
      <Route path='/task/view-task/:id' element={<Layout><ViewDetails /></Layout>} />
      <Route path='/task/:add-task' element={<Layout><AddTask /></Layout>} />

      <Route path='/task-type' element={<Layout><TaskType /></Layout>} />
      <Route path='/task-type/:add-task-type' element={<Layout><AddTaskType /></Layout>} />
      <Route path='/task-type/view-task-type/:id' element={<Layout><ViewDetails /></Layout>} />
      <Route path='/task-type/edit-task-type/:id' element={<Layout><EditTaskType /></Layout>} />

      <Route path='/flow' element={<Layout><Flow /></Layout>} />
      <Route path='/flow/:add-flow' element={<Layout><AddFlow /></Layout>} />
      <Route path='/flow/view-flow/:id' element={<Layout><ViewDetails /></Layout>} />
      <Route path='/flow/:edit-flow/:id' element={<Layout><EditFlow /></Layout>} />

      <Route path='/schedule' element={<Layout><Schedule /></Layout>} />
      <Route path='/schedule/:add-schedule' element={<Layout><AddSchedule /></Layout>} />
      <Route path='/schedule/view-schedule/:id' element={<Layout><ViewDetails /></Layout>} />
      <Route path='/schedule/:edit-schedule/:id' element={<Layout><EditSchedule /></Layout>} />

      <Route path='*' element={<Layout><NotFound /></Layout>} />
      <Route path='/login' element={<LoginLayout><Login /></LoginLayout>} />
      <Route path='/register' element={<LoginLayout><Register /></LoginLayout>} />

      <Route path='/monitor' element={<MonitorLayout><RequireAuth><Monitor /></RequireAuth></MonitorLayout>} />
    </Routes>
  );
}

export default App;