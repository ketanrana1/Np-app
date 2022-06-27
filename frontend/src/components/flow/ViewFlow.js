import React from 'react'

const ViewFlow = ({detail}) => {
    const { name, description, tasks, variableSel } = detail
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
            <tr>
                <th scope="col">Variable Sel: </th>
                <td>{variableSel}</td>
            </tr> 
            {
                tasks && tasks?.map((task) => {
                    return (
                        <tr>
                            <th scope="col">Tasks: </th>
                            <td>{task}</td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default ViewFlow