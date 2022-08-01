import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import { toast } from 'react-toastify';
import Modal from '../components/layout/Modal';
import $ from "jquery";
import Loader from '../components/field/loader';

const Flow = () => {

  const [flow, setFlow] = useState([]);
  const [flowId,setFlowId] = useState("");
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    const getFlow = async () => {
      try {
        const response = await axios({
          method: 'get',    
          url: `${REACT_APP_BACKEND_URL}/api/get-flow`,
          headers: {
              'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }        
        });
        setLoader(false)
        setFlow(response.data.reverse().map((item) => {
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

    getFlow();

  }, [])

  const handleDeleteClick = async (flowId) => {
    setLoader(true)
    const payload = {
      flowId
    }
    try {
      const result = await axios({
        method: 'post',    
        url: `${REACT_APP_BACKEND_URL}/api/delete-flow`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        },   
        data: payload         
      });
      setLoader(false)
      toast(result.data.message, { autoClose: 2000 });
      setFlow(flow.filter((item) => item.flowId !== flowId))
      $("#delete-confirmation-modal").modal("hide");
      
      return;
    } catch (error) {
      setLoader(false)
      return toast(error?.message, { autoClose: 2000 })
    }
  }

  const handleReadMoreClick = (index) => {
    const readMoreHandle = [...flow];
    readMoreHandle[index].readMore = "block";
    setFlow(readMoreHandle)
  }

  return (
    <>
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
                  return <tr key={index}>
                    <th className="first-row" scope="row">{item.name}</th>
                    <td className="second-row" ><p>
                      <span style={{display:  item.readMore === "none" ? "block" : "none" }} className="short-decp"> 
                        { item.description.length > 150 ? item.description.slice(0, 150) :  item.description}
                          <span className="read-more-text" onClick={() => handleReadMoreClick(index)}> { item.description.length > 150 ? 'Read More...' : '' }</span> 
                          </span>
                      <span style={{display: item.readMore }}className="full-text">{item.description}</span></p></td>
                    <td className="third-row"><p>{item.tasks.map((_item,index) => index !== item.tasks.length - 1 ? `${_item}, ` : _item)}</p></td>
                    <td className="fourth-row">
                      <Link to={`/flow/view-flow/${item.flowId}`} state={{ tab: "flow", name: item.name }} className="view-link" >
                      <img src={require('../assets/images/search.png')} alt="View" />
                      </Link>
                      <Link to={`/flow/edit-flow/${item.flowId}`} className="view-link" >
                        <img src={require('../assets/images/edit.png')} alt="edit" />
                        </Link>
                      <a onClick={() => setFlowId(item.flowId)} className="delete-link" data-toggle="modal" data-target="#delete-confirmation-modal">
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
    <Modal deleteHandler={() => handleDeleteClick(flowId)}/>
    {loader && <Loader/>}
    </>
  )
}

export default Flow