import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import { toast } from 'react-toastify';
import Modal from '../components/layout/Modal';
import $ from "jquery";
import Loader from '../components/field/loader';

const ConnectionType = () => {

  const [connectionType, setConnectionType] = useState([]);
  const [connectionTypeId,setConnectionTypeId] = useState("");
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    const getconnectionType = async () => {
      try {
        const response = await axios({
          method: 'get',    
          url: `${REACT_APP_BACKEND_URL}/api/get-connection-type`,
          headers: {
              'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }         
        });
        setLoader(false)
        setConnectionType(response.data.reverse().map((item) => {
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

    getconnectionType();

  }, [])

  const handleDeleteClick = async (connectionTypeId) => {
    setLoader(true)
    const payload = {
      connectionTypeId
    }
    try {
      const result = await axios({
        method: 'post',    
        url: `${REACT_APP_BACKEND_URL}/api/delete-connectionType`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        },   
        data: payload         
      });
      setLoader(false)
      toast(result.data.message);
      setConnectionType(connectionType.filter((item) => item.connectionTypeId !== connectionTypeId))
      $("#delete-confirmation-modal").modal("hide");
      
      return;
    } catch (error) {
      setLoader(false)
      return toast(error?.message)
    }
  }

  const handleReadMoreClick = (index) => {
    const readMoreHandle = [...connectionType];
    readMoreHandle[index].readMore = "block";
    setConnectionType(readMoreHandle)
  }

  return (
    <>
    <div>
      <h1 className="page-head">connectionType </h1>
      <div className="inner-body-cont">
        <div className="btn-bloat-right">
          <Link className="commn-btn" to="/connection-type/:add-connection-type">Create New</Link>
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
                connectionType.map((item, index) => {
                  return <tr>
                    <th className="first-row" scope="row">{item.name}</th>
                    <td></td>
                    <td></td>
                    <td className="fourth-row">
                      <Link to={`/connection-type/view-connection-type/${item.connectionTypeId}`} state={{ tab: "connection-type", name: item.name }} className="view-link" >View</Link>
                      <Link to={`/connection-type/edit-connection-type/${item.connectionTypeId}`} className="view-link" >Edit</Link>
                      <a onClick={() => setConnectionTypeId(item.connectionTypeId)} className="delete-link" data-toggle="modal" data-target="#delete-confirmation-modal">
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
    <Modal deleteHandler={() => handleDeleteClick(connectionTypeId)}/>
    {loader && <Loader/>}
    </>
  )
}

export default ConnectionType