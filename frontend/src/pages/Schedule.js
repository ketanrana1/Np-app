import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import { toast } from 'react-toastify';
import Modal from '../components/layout/Modal';
import $ from "jquery";
import Loader from '../components/field/loader';

const Schedule = () => {

  const [schedule, setSchedule] = useState([]);
  const [scheduleId, setScheduleId] = useState("");
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    const getSchedule = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-schedule`)
        setLoader(false)
        setSchedule(response.data.reverse().map((item) => {
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
    getSchedule();
  }, [])

  const handleDeleteClick = async (scheduleId) => {
    setLoader(true)
    const payload = {
      scheduleId
    }
    try {
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/delete-schedule`, payload)
      toast(result.data.message);
      setSchedule(schedule.filter((item) => item.scheduleId !== scheduleId))
      $("#delete-confirmation-modal").modal("hide");
      return;
    } catch (error) {
      setLoader(false)
      return toast(error?.message)
    }
  }


  const handleReadMoreClick = (index) => {
    const readMoreHandle = [...schedule];
    readMoreHandle[index].readMore = "block";
    setSchedule(readMoreHandle)
  }


  return (
    <>
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
                      <td className="second-row" ><p>
                        <span style={{ display: item.readMore === "none" ? "block" : "none" }} className="short-decp">
                          {item.description.length > 150 ? item.description.slice(0, 150) : item.description}
                          <span className="read-more-text" onClick={() => handleReadMoreClick(index)}> {item.description.length > 150 ? 'Read More...' : ''}</span>
                        </span>
                        <span style={{ display: item.readMore }} className="full-text">{item.description}</span></p></td>
                      <td className="third-row"><p>{item.flows}</p></td>
                      <td className="fourth-row">
                        <Link to={`/schedule/view-schedule/${item.scheduleId}`} state={{ tab: "schedule", name: item.name }} className="view-link" >View</Link>
                        <Link to={`/schedule/edit-schedule/${item.scheduleId}`} className="view-link" >Edit</Link>
                        <a onClick={() => setScheduleId(item.scheduleId)} className="delete-link" data-toggle="modal" data-target="#delete-confirmation-modal">
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
      <Modal deleteHandler={() => handleDeleteClick(scheduleId)} />
      {loader && <Loader />}
    </>
  )
}

export default Schedule