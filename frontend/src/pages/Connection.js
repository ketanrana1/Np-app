import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import { toast } from 'react-toastify';
import Modal from '../components/layout/Modal';
import $ from "jquery";
import Loader from '../components/field/loader';

const Connection = () => {

  const [connection, setConnection] = useState([]);
  const [connectionId, setConnectionId] = useState("");
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    const getConnectionType = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-connection`)
        setLoader(false)
        setConnection(response.data.reverse().map((item) => {
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
    getConnectionType();
  }, [])

  const handleDeleteClick = async () => {
    setLoader(true)
    const payload = {
      connectionId
    }
    try {
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/delete-connection`, payload)
      setLoader(false)
      toast(result.data.message);
      setConnection(connection.filter((item) => item.connectionId !== connectionId))
      $("#delete-confirmation-modal").modal("hide");
      return;
    } catch (error) {
      setLoader(false)
      return toast(error?.message)
    }
  }



  const handleReadMoreClick = (index) => {
    const readMoreHandle = [...connection];
    readMoreHandle[index].readMore = "block";
    setConnection(readMoreHandle)
  }

  return (
    <>
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
                      <td className="second-row" ><p>
                        <span style={{ display: item.readMore === "none" ? "block" : "none" }} className="short-decp">
                          {item.description.length > 150 ? item.description.slice(0, 150) : item.description}
                          <span className="read-more-text" onClick={() => handleReadMoreClick(index)}> {item.description.length > 150 ? 'Read More...' : ''}</span>
                        </span>
                        <span style={{ display: item.readMore }} className="full-text">{item.description}</span></p></td>
                      <td className="third-row"><p>{item.connectionName}</p></td>
                      <td className="fourth-row">
                        <a onClick={() => setConnectionId(item.connectionId)} className="delete-link" data-toggle="modal" data-target="#delete-confirmation-modal">
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
      <Modal deleteHandler={() => handleDeleteClick(connectionId)} />
      {loader && <Loader />}

    </>
  )
}

export default Connection