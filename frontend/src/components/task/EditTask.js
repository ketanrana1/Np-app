import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';

const EditTask = () => {

  const [taskDetail, setTaskDetail] = useState([]);

  const params = useParams();
  const { id } = params;
  console.log("YOOOOO", id)

  useEffect(() => {
    const getTaskType = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-task-type`)
      setTaskDetail(response.data)
    }
    getTaskType();
  },[])


  return (
    <div>
      <h1 className="page-head">Edit task</h1>
      <div className="inner-body-cont">
      </div>
    </div>
  )
}

export default EditTask