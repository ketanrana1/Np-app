import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Link,
    useLocation,
    useParams,
} from "react-router-dom";

import { REACT_APP_BACKEND_URL } from '../components/common/environment';
import ViewConnectionType from '../components/connectionType/ViewConnectiontype';
import Loader from '../components/field/loader';
import ViewFlow from '../components/flow/ViewFlow';
import ViewSchedule from '../components/schedule/ViewSchedule';
import ViewTask from '../components/task/ViewTask';
import ViewTaskType from '../components/taskType/ViewTaskType';


const ViewDetails = () => {
    const { id } = useParams()
    const { state: { tab, name } } = useLocation();

    const [loader, setLoader] = useState(false)
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const getdetailsType = async () => {
            try {
                setLoader(true)
                const { data } = await axios({
                    method: 'get',    
                    url: `${REACT_APP_BACKEND_URL}/api/get-${tab}/${id}`,
                    headers: {
                        'Authorization': `${sessionStorage.getItem('AccessToken')}`
                    }        
                  });
                setDetails(data)              
                setLoader(false)
            } catch (error) {
                setLoader(false)
                console.log(error);
            }
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
                            <table className="single-view-table table">
                                <tbody>
                                    {details && details?.map((detail) => {
                                        return (
                                            <>
                                                {tab === "task" && <ViewTask detail={detail} />}
                                                {tab === "flow" && <ViewFlow detail={detail} />}
                                                {tab === "schedule" && <ViewSchedule detail={detail} />}
                                                {tab === "task-type" && <ViewTaskType detail={detail} />}
                                                {tab === "connection-type" && <ViewConnectionType detail={detail} />}
                                            </>
                                        )
                                    })}

                                </tbody>
                            </table>
                            <Link to={`/${tab}/edit-${tab}/${id}`} className="edit-link-view view-link mt-5" >Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
            {loader && <Loader />}
        </div>
    )
}

export default ViewDetails