import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import { toast } from 'react-toastify';

const Schedule = () => {

  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const getSchedule = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-schedule`)
      console.log("response",response.data);
      setSchedule(response.data) 
    }
    getSchedule();
  },[])

  const handleDeleteClick = async (scheduleId) => {
    if (!window.confirm("Are you sure?")) return;
    const payload = {
      scheduleId
    }
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/delete-schedule`, payload)
      toast(result.data.message);  
      setSchedule(schedule.filter((item) => item.scheduleId !== scheduleId))
      return;
    } catch (error) {
      return toast(error?.message)      
    }
  }
 

  return ( 
    <div>
      <h1 className="page-head">Schedule </h1>
     <div className="inner-body-cont">
      <div className="btn-bloat-right">
         <Link className="commn-btn" to="/schedule/add-schedule">Create New</Link>
      </div> 
       
       <div className="commn-table-cont table-responsive-md">
       <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Desc.</th>
            <th scope="col">Flows</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody> 
        {
            schedule.map((item, index) => {
            return <tr> 
                      <th className="first-row" scope="row">{item.name}</th>
                      <td className="second-row" >{item.description}</td>
                      <td className="third-row"><p>{item.flows}</p></td>
                      <td className="fourth-row">
                      <Link to={`/schedule/view-schedule/${item.scheduleId}`} state={{ tab: "schedule", name: item.name }} className="view-link" >View</Link>
                      <Link to={`/schedule/edit-schedule/${item.scheduleId}`} className="view-link" >Edit</Link>
                      <a onClick={() => handleDeleteClick(item.scheduleId)} className="delete-link">
                        <img src={require('../assets/images/delete.png')} alt="delete" />
                      </a>
                      </td>
                    </tr>
            })
          }
        </tbody> 
      </table>
       </div>
     </div>
    </div>
  )
}

export default Schedule