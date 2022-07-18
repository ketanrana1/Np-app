import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import { toast } from 'react-toastify';
import Modal from '../components/layout/Modal';
import $ from "jquery";
import Loader from '../components/field/loader';


const Task = () => {

  const [task, setTask] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const getTaskType = async() => {
      try {
        setLoader(true)
        const response = await axios({
          method: 'get',    
          url: `${REACT_APP_BACKEND_URL}/api/get-task`,
          headers: {
              'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }        
        });
        setLoader(false)
        setTask(response.data.reverse().map((item) => {
          return {
            ...item,
            readMore: "none",
          }
        }))
      } catch (error) {
        setLoader(false)
        console.log(error);
      }
     
    }
    
    getTaskType();
    
  },[])

  const handleDeleteClick = async (taskId) => {
    const payload = {
      taskId
    }
    try {    
      const result = await axios({
        method: 'post',    
        url: `${REACT_APP_BACKEND_URL}/api/delete-task`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        },   
        data: payload         
      });
      toast(result.data.message, { autoClose: 2000 });  
      setTask(task.filter((item) => item.taskId !== taskId))
      $("#delete-confirmation-modal").modal("hide");
      return;
    } catch (error) {
      return toast(error?.message, { autoClose: 2000 })      
    }
  }

  const handleReadMoreClick = (index) => {
    const readMoreHandle = [...task];
    readMoreHandle[index].readMore = "block";
    setTask(readMoreHandle)
  }

  return (
    <>
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
            return <tr key={index}> 
                      <th className="first-row" scope="row">{item.name}</th>
                      <td className="second-row" ><p>
                      <span style={{display:  item.readMore === "none" ? "block" : "none" }} className="short-decp"> 
                        { item.description.length > 150 ? item.description.slice(0, 150) :  item.description}
                          <span className="read-more-text" onClick={() => handleReadMoreClick(index)}> { item.description.length > 150 ? 'Read More...' : '' }</span> 
                          </span>
                      <span style={{display: item.readMore }}className="full-text">{item.description}</span></p></td>
                      <td className="third-row"><p>{item.taskName}</p></td>
                      <td className="fourth-row">
                      <Link to={`/task/view-task/${item.taskId}`} state={{ tab: "task", name: item.name}} className="view-link" >View</Link>
                      <Link to={`/task/edit-task/${item.taskId}`} className="view-link" >Edit</Link>
                      <a onClick={() => setTaskId(item.taskId)} className="delete-link" data-toggle="modal" data-target="#delete-confirmation-modal">
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
    <Modal deleteHandler={() => handleDeleteClick(taskId)}/>
    {loader && <Loader/>}
    </>
  )
}

export default Task