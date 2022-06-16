import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-toastify/dist/ReactToastify.css';

import './assets/css/global.css';
import './assets/css/login.css';
import App from './App';
import { ToastContainer } from "react-toastify"

ReactDOM.render(
  <BrowserRouter>
  <ToastContainer />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);