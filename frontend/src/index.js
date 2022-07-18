import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-toastify/dist/ReactToastify.css';

import './assets/css/global.css';
import './assets/css/login.css';
import App from './App';
import { ToastContainer } from "react-toastify"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <ToastContainer />
    <App />
  </BrowserRouter>
)

// ReactDOM.render(
// ,
//   document.getElementById('root')
// );