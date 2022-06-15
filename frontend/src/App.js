import { Route, Routes, Navigate, Link } from 'react-router-dom';


import NotFound from './pages/NotFound';
import Connection from './pages/Connection';
import ConnectionType from './pages/ConnectionType';
import Layout from './components/layout/layout';
import AddConnection from './components/connection/AddConnection';
import EditConnection from './components/connection/EditConnection';
import AddConnectionType from './components/connectionType/AddConnectionType';
import EditConnectionType from './components/connectionType/EditConnectionType';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate replace to='/connection' />} />
        <Route path='/connection' element={<Connection />} />
        <Route path='/connection/:add-connection' element={<AddConnection />} />
        <Route path='/connection/:edit-connection' element={<EditConnection />} />
        <Route path='/connection-type' element={<ConnectionType />} />
        <Route path='/connection-type/:add-connection-type' element={<AddConnectionType />} />
        <Route path='/connection-type/:edit-connection-type' element={<EditConnectionType />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;