import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import { toast } from 'react-toastify';
import Modal from '../components/layout/Modal';
import $ from "jquery";
import Loader from '../components/field/loader';

const TaskType = () => {

  const [taskType, setTaskType] = useState([]);
  const [taskTypeId,setTaskTypeId] = useState("");
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    const getTaskType = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-taskType`)
        console.log(response);
        setLoader(false)
        setTaskType(response.data.reverse().map((item) => {
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

  }, [])

  const handleDeleteClick = async (taskTypeId) => {
    setLoader(true)
    const payload = {
      taskTypeId
    }
    try {
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/delete-taskType`, payload)
      setLoader(false)
      toast(result.data.message);
      setTaskType(taskType.filter((item) => item.taskTypeId !== taskTypeId))
      $("#delete-confirmation-modal").modal("hide");
      
      return;
    } catch (error) {
      setLoader(false)
      return toast(error?.message)
    }
  }

  const handleReadMoreClick = (index) => {
    const readMoreHandle = [...taskType];
    readMoreHandle[index].readMore = "block";
    setTaskType(readMoreHandle)
  }

  return (
    <>
    <div>
      <h1 className="page-head">taskType </h1>
      <div className="inner-body-cont">
        <div className="btn-bloat-right">
          <Link className="commn-btn" to="/task-type/:add-task-type">Create New</Link>
        </div>

        <div className="commn-table-cont table-responsive-md">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                taskType.map((item, index) => {
                  return <tr>
                    <th className="first-row" scope="row">{item.name}</th>
                    <td></td>
                    <td></td>
                    <td className="fourth-row">
                      <Link to={`/task-type/view-task-type/${item.taskTypeId}`} state={{ tab: "task-type", name: item.name }} className="view-link" >View</Link>
                      <Link to={`/task-type/edit-task-type/${item.taskTypeId}`} className="view-link" >Edit</Link>
                      <a onClick={() => setTaskTypeId(item.taskTypeId)} className="delete-link" data-toggle="modal" data-target="#delete-confirmation-modal">
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
    <Modal deleteHandler={() => handleDeleteClick(taskTypeId)}/>
    {loader && <Loader/>}
    </>
  )
}

export default TaskType