import React from 'react'

const ViewConnectionType = ({ detail }) => {
    
    const { name, attributes } = detail
    console.log(detail);
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
                        return (
                            <tr>
                                <td className='col-2'>{attr}</td>
                            </tr>
                        )
                    })}
                </tr>
            }
        </>
    )
}

export default ViewConnectionType