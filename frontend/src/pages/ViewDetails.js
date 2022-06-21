import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    useLocation,
    useParams,
} from "react-router-dom";

import { REACT_APP_BACKEND_URL } from '../components/common/environment';
const ViewDetails = () => {
    const { id } = useParams()

    const { state: tab } = useLocation();

    const [details, setDetails] = useState([]);

    useEffect(() => {
        const getdetailsType = async () => {
            const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-${tab}/${id}`)
            setDetails(data)
            console.log("KTR", data)
        }

        getdetailsType();
        return () => {
            setDetails('')
        }

    }, [])

    return (
        <div>
            <h1 className="page-head">View </h1>
            <div className="inner-body-cont">
                <div className="commn-table-cont table-responsive-md">
                    <div className="row">
                        <div className="form-group col-12">
                            {details && details?.map((detail) => {
                                const {
                                    name,
                                    description,
                                    taskId,
                                    taskName,
                                    createdAt,
                                    updatedAt,
                                    taskTypeAttributes
                                } = detail

                                return (<div className="label-input-cont">
                                    {name && <p>Name: {name}</p>}
                                    {description && <p>Description: {description}</p>}
                                    {taskId && <p>Task Id: {taskId}</p>}
                                    {taskName && <p>Task Name: {taskName}</p>}
                                    {createdAt && <p>Created At: {createdAt}</p>}
                                    {updatedAt && <p>Updated At: {updatedAt}</p>}
                                    <div><p>Attributes: </p>
                                        {taskTypeAttributes && taskTypeAttributes?.map((attr) => {
                                            const {key,value} = attr
                                            return (
                                                <>
                                                    <div className='col-12 d-flex'>
                                                        <p className='col-6'>Key: {key}</p>
                                                        <p>Value: {value}</p>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetails