import { NavLink,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MainNavigation = () => {
  const navigate = useNavigate()
  const logoutUser = () => {
    sessionStorage.setItem('Auth key', '');
    navigate("/login")
    return toast("Logout Successfully", { autoClose: 2000 })
  }
  return (
    <>
      <nav className="main-nav navbar navbar-expand-lg navbar-light bg-light">
        <p className="sb-title">NAVIGATION</p>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav d-flex flex-md-column">
          <li className="nav-item">
            <NavLink to='/monitor' className={navData => navData.isActive ? 'active' : ''}>
              <img src={require('../../assets/images/connection.png')} alt="connection" /> Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/connection' className={navData => navData.isActive ? 'active' : ''}>
              <img src={require('../../assets/images/connection.png')} alt="connection" /> Connection
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/task' className={navData => navData.isActive ? 'active' : ''}>
              <img src={require('../../assets/images/task-list.png')} alt="connection" /> Task
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/flow' className={navData => navData.isActive ? 'active' : ''}>
              <img src={require('../../assets/images/flow-chart.png')} alt="connection" /> Flow
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/schedule' className={navData => navData.isActive ? 'active' : ''}>
              <img src={require('../../assets/images/calendar.png')} alt="connection" />  Schedule
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/connection-type' className={navData => navData.isActive ? 'active' : ''}>
              <img src={require('../../assets/images/connection.png')} alt="connection" />Connection type
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/task-type' className={navData => navData.isActive ? 'active' : ''}>
              <img src={require('../../assets/images/task-list.png')} alt="connection" />Task Type
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/register-user' className={navData => navData.isActive ? 'active' : ''}>
              <img src={require('../../assets/images/user.png')} alt="connection" />Add User
            </NavLink>
          </li>
          <div className="divider" />
          <li className="nav-item">
            <div className='logout' onClick={logoutUser}>
              <img src={require('../../assets/images/logout.png')} alt="connection" />Logout
            </div>
          </li>
        </ul>
        </div>
      </nav>
    </>
  );
};

export default MainNavigation;