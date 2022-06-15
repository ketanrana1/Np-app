import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
  return (
    <>
      <nav className="main-nav navbar bg-light px-0">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to='/connection' className={navData => navData.isActive ? 'active' : '' }>
            <img src={require('../../assets/images/connection.png')} alt="connection" /> Connection
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to='/task' className={navData => navData.isActive ? 'active' : '' }>
            <img src={require('../../assets/images/task-list.png')} alt="connection" /> Task
            </NavLink>
            </li>
            <li className="nav-item">   
            <NavLink to='/flow' className={navData => navData.isActive ? 'active' : '' }>
            <img src={require('../../assets/images/flow-chart.png')} alt="connection" /> Flow
            </NavLink>
            </li>
            <li className="nav-item">        
            <NavLink to='/schedule' className={navData => navData.isActive ? 'active' : '' }>
            <img src={require('../../assets/images/calendar.png')} alt="connection" />  Schedule
            </NavLink>
            </li>

            <li className="nav-item">    
            <NavLink to='/connection-type' className={navData => navData.isActive ? 'active' : '' }>
            <img src={require('../../assets/images/connection.png')} alt="connection" />Connection type
            </NavLink>
          </li>
        </ul>
      </nav>
</>
      
    
  );
};

export default MainNavigation;