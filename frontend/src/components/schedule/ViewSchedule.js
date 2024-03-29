import React from 'react'

const ViewSchedule = ({detail}) => {
    const { name, description, flows, activeFlag, success_Email, error_Email, cronPattern } = detail
    return (
        <>
            <tr>
                <th scope="col">Name: </th>
                <td>{name}</td>
            </tr>

            <tr>
                <th scope="col">Description</th>
                <td>{description}</td>
            </tr>
            { flows && <tr>
                <th scope="col">Flow Type: </th>
                {flows.map((item)=>{
                    return( <td>{item}</td>)
                })}
               
            </tr> }
            <tr>
                <th scope="col">Cron Pattern: </th>
                <td>{cronPattern}</td>
            </tr>
            <tr>
                <th scope="col">Active Flag: </th>
                <td>{activeFlag}</td>
            </tr>
            <tr>
                <th scope="col">Success Email: </th>
                <td>{success_Email}</td>
            </tr>
            <tr>
                <th scope="col">Error Email: </th>
                <td>{error_Email}</td>
            </tr>

        </>
    )
}

export default ViewSchedule