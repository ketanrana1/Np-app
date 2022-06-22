import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Link,
    useLocation,
    useParams,
} from "react-router-dom";

import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import ViewFlow from '../components/flow/ViewFlow';
import ViewSchedule from '../components/schedule/ViewSchedule';
import ViewTask from '../components/task/ViewTask';
const ViewDetails = () => {
    const { id } = useParams()

    const { state: { tab, name }, pathname } = useLocation();
    const checking = useLocation()
    console.log("checking",checking);
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
            <h1 className="page-head text-capitalize">{name} Details</h1>
            <div className="inner-body-cont">
                <div className="commn-table-cont table-responsive-md">
                    <div className="row">
                        <div className="form-group col-12">
                            <table class="table">
                                <tbody>
                                    {details && details?.map((detail) => {
                                        return (
                                            <>
                                                {tab === "task" && <ViewTask detail={detail} />}
                                                {tab === "flow" && <ViewFlow detail={detail} />}
                                                {tab === "schedule" && <ViewSchedule detail={detail} />}
                                               
                                            </>
                                        )
                                    })}

                                </tbody>
                            </table>
                            <Link to={`/${tab}/edit-${tab}/${id}`} className="view-link btn btn-primary mt-5" >Edit</Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetails