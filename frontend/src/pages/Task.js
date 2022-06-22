import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import { toast } from 'react-toastify';

const Task = () => {

  const [task, setTask] = useState([]);

  useEffect(() => {
    const getTaskType = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-task`)
      setTask(response.data)
    }
    
    getTaskType();
    
  },[])

  const handleDeleteClick = async (taskId) => {
    const payload = {
      taskId
    }
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/delete-task`, payload)
      toast(result.data.message);  
      setTask(task.filter((item) => item.taskId !== taskId))
      return;
    } catch (error) {
      return toast(error?.message)      
    }
  }

  return (
    <div>
      <h1 className="page-head">Task </h1>
     <div className="inner-body-cont">
      <div className="btn-bloat-right">
         <Link className="commn-btn" to="/task/add-task">Create New</Link>
      </div> 
       
       <div className="commn-table-cont table-responsive-md">
       <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Desc.</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {
            task.map((item, index) => {
              console.log("item",item)
            return <tr> 
                      <th className="first-row" scope="row">{item.name}</th>
                      <td className="second-row" >{item.description}</td>
                      <td className="third-row"><p>{item.taskName}</p></td>
                      <td className="fourth-row">
                      <Link to={`/task/view-task/${item.taskId}`} state={"task"}className="view-link" >View</Link>
                      <Link to={`/task/edit-task/${item.taskId}`} className="view-link" >Edit</Link>
                      <a onClick={() => handleDeleteClick(item.taskId)} className="delete-link">
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

export default Task