import React from 'react'

const ViewTask = ({detail}) => {
    const { name, description, taskId, taskTypeAttributes } = detail
    return (
        <>
            <tr>
                <th className="col-2">Name: </th>
                <td>{name}</td>
            </tr>

            <tr>
                <th className="col-2">Description</th>
                <td>{description}</td>
            </tr>

            <tr>
                <th className="col-2">Task Id: </th>
                <td>{taskId}</td>
            </tr>

            {
                taskTypeAttributes && <tr className='col-12 border-top'>
                    <th>Attributes: </th>
                    {taskTypeAttributes.map((attr) => {
                        const { key, value } = attr
                        return (
                            <div className='col-6'>
                                <td className='col-2'>Key: {key}</td>
                                {value && <td className='col-2'>Value: {value}</td>}
                            </div>
                        )
                    })}
                </tr>
            }
        </>
    )
}

export default ViewTask