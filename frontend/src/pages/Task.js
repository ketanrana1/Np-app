import React from 'react'
import { Link } from 'react-router-dom';

const Task = () => {
  return (
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
          <tr>
            <th className="first-row" scope="row">SF01</th>
            <td className="second-row" >Lorem ipsum dolor sit amet consectetur adipisicing.</td>
            <td className="third-row"><p>SALESFORCE</p></td>
            <td className="fourth-row"><a href="" className="view-link">View</a> <a className="delete-link" href=""><img src={require('../assets/images/delete.png')} alt="delete" /></a></td>
          </tr>
          <tr>
            <th className="first-row" scope="row">SF01</th>
            <td  className="second-row" >Lorem ipsum dolor sit amet consectetur adipisicing.</td>
            <td className="third-row" ><p>SALESFORCE</p></td>
            <td className="fourth-row"><a href="" className="view-link">View</a> <a className="delete-link" href=""><img src={require('../assets/images/delete.png')} alt="delete" /></a></td>
          </tr>
          <tr>
            <th className="first-row" scope="row">SF01</th>
            <td className="second-row" >Lorem ipsum dolor sit amet consectetur adipisicing.</td>
            <td className="third-row" ><p>SALESFORCE</p></td>
            <td className="fourth-row"><a href="" className="view-link">View</a> <a className="delete-link" href=""><img src={require('../assets/images/delete.png')} alt="delete" /></a></td>
          </tr>
          <tr>
            <th className="first-row" scope="row">SF01</th>
            <td className="second-row" >Lorem ipsum dolor sit amet consectetur adipisicing.</td>
            <td className="third-row" ><p>SALESFORCE</p></td>
            <td className="fourth-row"><a href="" className="view-link">View</a> <a className="delete-link" href=""><img src={require('../assets/images/delete.png')} alt="delete" /></a></td>
          </tr>
        </tbody>
      </table>
       </div>
     </div>
    </div>
  )
}

export default Task