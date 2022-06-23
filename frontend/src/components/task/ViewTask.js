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

            {
                taskTypeAttributes && <tr className='col-12 border-top'>
                    <th>Attributes: </th>
                    {taskTypeAttributes.map((attr) => {
                        const { key, value,fieldRequired } = attr
                        return (
                            <div>
                                <td className='col-2'>{key}</td>
                                {value && <td className='col-2'>{`${value}`} </td>}
                            </div>
                        )
                    })}
                </tr>
            }
        </>
    )
}

export default ViewTask