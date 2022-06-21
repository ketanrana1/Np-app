import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './components/layout/layout';
import LoginLayout from './components/layout/LoginLayout';
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
import Login from './pages/Login';
import { useEffect } from 'react';
import Register from './pages/Register';
import AddTaskType from './components/taskType/AddTaskType';

function App() {

  useEffect(() => {
    if(!sessionStorage.getItem('Auth key') && window.location.pathname !== "/login") return window.location.href = "/login"
  },[])

  return (
    
      <Routes>
        <Route path='/' element={<Layout><Navigate replace to='/connection' /></Layout>} />
        <Route path='/connection-type' element={<Layout><ConnectionType /></Layout>} />
        <Route path='/connection-type/:add-connection-type' element={<Layout><AddConnectionType /></Layout>} />
        <Route path='/connection-type/:edit-connection-type' element={<Layout><EditConnectionType /></Layout>} />
        <Route path='/connection' element={<Layout><Connection /></Layout>} />
        <Route path='/connection/:add-connection' element={<Layout><AddConnection /></Layout>} />
        <Route path='/connection/:edit-connection' element={<Layout><EditConnection /></Layout>} />
        <Route path='/task' element={<Layout><Task /></Layout>} />
        <Route path='/task/edit-task/:id' element={<Layout><EditTask /></Layout>} />
        <Route path='/task/:add-task' element={<Layout><AddTask /></Layout>} />
        <Route path='/task-type/:add-task-type' element={<Layout><AddTaskType /></Layout>} />
        <Route path='/flow' element={<Layout><Flow /></Layout>} />
        <Route path='/flow/:add-flow' element={<Layout><AddFlow /></Layout>} />
        <Route path='/flow/edit-flow/:id' element={<Layout><EditFlow /></Layout>} />
        <Route path='/schedule' element={<Layout><Schedule /></Layout>} />
        <Route path='/schedule/:add-schedule' element={<Layout><AddSchedule /></Layout>} />
        <Route path='/schedule/:edit-schedule' element={<Layout><EditSchedule /></Layout>} />
        <Route path='*' element={<Layout><NotFound /></Layout>} />
        <Route path='/login' element={<LoginLayout><Login /></LoginLayout>} />
        <Route path='/register' element={<LoginLayout><Register /></LoginLayout>} />
      </Routes>
  );
}

export default App;