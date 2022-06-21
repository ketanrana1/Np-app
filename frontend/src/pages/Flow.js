import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import { toast } from 'react-toastify';

const Flow = () => {

  const [flow, setFlow] = useState([]);

  useEffect(() => {
    const getFlow = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-flow`)
      setFlow(response.data) 
      console.log("KTR", response.data)
    }
    
    getFlow();
    
  },[])

  const handleDeleteClick = async (flowId) => {
    const payload = {
      flowId
    }
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/delete-flow`, payload)
      toast(result.data.message);  
      setFlow(flow.filter((item) => item.flowId !== flowId))
      return;
    } catch (error) {
      return toast(error?.message)      
    }
  }


  return ( 
    <div>
      <h1 className="page-head">Flow </h1>
     <div className="inner-body-cont">
      <div className="btn-bloat-right">
         <Link className="commn-btn" to="/flow/add-flow">Create New</Link>
      </div> 
       
       <div className="commn-table-cont table-responsive-md">
       <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Desc.</th>
            <th scope="col">Tasks</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody> 
        {
            flow.map((item, index) => {
            return <tr> 
                      <th className="first-row" scope="row">{item.name}</th>
                      <td className="second-row" >{item.description}</td>
                      <td className="third-row"><p>{item.tasks}</p></td>
                      <td className="fourth-row">
                      <Link to={`/flow/edit-flow/${item.flowId}`} className="view-link" >Edit</Link>
                      <a onClick={() => handleDeleteClick(item.flowId)} className="delete-link">
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

export default Flow