import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import { toast } from 'react-toastify';

const Connection = () => {

  const [connection, setConnection] = useState([]);

  useEffect(() => {
    const getConnectionType = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-connection`)
      setConnection(response.data)
    }
    getConnectionType();
  },[])

  const handleDeleteClick = async (connectionId) => {
    if (!window.confirm("Are you sure?")) return;
    const payload = {
      connectionId
    }
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/delete-connection`, payload)
      toast(result.data.message);  
      setConnection(connection.filter((item) => item.connectionId !== connectionId))
      return;
    } catch (error) {
      return toast(error?.message)      
    }
  }



  return (
    <div>
      <h1 className="page-head">Connection </h1>
     <div className="inner-body-cont">
      <div className="btn-bloat-right">
         <Link className="commn-btn" to="/connection/add-connection">Create New</Link>
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
            connection.map((item, index) => {
            return <tr> 
                      <th className="first-row" scope="row">{item.name}</th>
                      <td className="second-row" >{item.description}</td>
                      <td className="third-row"><p>{item.connectionName}</p></td>
                      <td className="fourth-row">
                        {/* <a href="" className="view-link">View</a> */}
                        <a onClick={() => handleDeleteClick(item.connectionId)} className="delete-link">
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

export default Connection