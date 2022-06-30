import React from 'react'

const ViewTaskType = ({ detail }) => {
    const { name, attributes } = detail
    return (
        <>
            <tr>
                <th className="col-2">Name: </th>
                <td>{name}</td>
            </tr>

            {
                attributes && <tr className='col-12 border-top'>
                    <th>Attributes: </th>
                    {attributes.map((attr) => {
                        const { name } = attr
                        return (
                            <tr>
                                <td className='col-2'>{name}</td>
                            </tr>
                        )
                    })}
                </tr>
            }
        </>
    )
}

export default ViewTaskType