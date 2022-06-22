import React from 'react'
import { Link } from 'react-router-dom';

const Schedule = () => {
  return (
    <div>
      <h1 className="page-head">Flow </h1>
     <div className="inner-body-cont">
      <div className="btn-bloat-right">
         <Link className="commn-btn" to="/schedule/add-schedule">Create Schedule</Link>
      </div>
       
       <div className="commn-table-cont table-responsive-md flow-table">
       <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Desc.</th>
            <th scope="col">Tasks</th>
            <th scope="col">VariableSel</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="first-row" scope="row">SF01</th>
            <td className="second-row" >Lorem ipsum dolor sit amet consectetur adipisicing.</td>
            <td className="third-row">Task Name</td>
            <td className="fifth-row"><p>********</p></td>
            <td className="fourth-row"><Link to={`/schedule/view-schedule/1234`} state={{ tab: "schedule", name: "Guru" }} className="view-link" >View</Link>
            <a className="delete-link" href=""><img src={require('../assets/images/delete.png')} alt="delete" /></a></td>
          </tr>
          <tr>
            <th className="first-row" scope="row">SF01</th>
            <td  className="second-row" >Lorem ipsum dolor sit amet consectetur adipisicing.</td>
            <td className="third-row" >Task Name</td>
            <td className="fifth-row"><p>********</p></td>
            <td className="fourth-row"><a href="" className="view-link">View</a> <a className="delete-link" href=""><img src={require('../assets/images/delete.png')} alt="delete" /></a></td>
          </tr>
          <tr>
            <th className="first-row" scope="row">SF01</th>
            <td className="second-row" >Lorem ipsum dolor sit amet consectetur adipisicing.</td>
            <td className="third-row" >Task Name</td>
            <td className="fifth-row"><p>********</p></td>
            <td className="fourth-row"><a href="" className="view-link">View</a> <a className="delete-link" href=""><img src={require('../assets/images/delete.png')} alt="delete" /></a></td>
          </tr>
          <tr>
            <th className="first-row" scope="row">SF01</th>
            <td className="second-row" >Lorem ipsum dolor sit amet consectetur adipisicing.</td>
            <td className="third-row" >Task Name</td>
            <td className="fifth-row">********</td>
            <td className="fourth-row"><a href="" className="view-link">View</a> <a className="delete-link" href=""><img src={require('../assets/images/delete.png')} alt="delete" /></a></td>
          </tr>
        </tbody>
      </table>
       </div>
     </div>
    </div>
  )
}


export default Schedule