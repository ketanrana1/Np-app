import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../field/loader';

const EditConnectionType = () => {

    let navigate = useNavigate()
    const [connectionType, setConnectionType] = useState([]);
    const [loader, setLoader] = useState(false)
    const [currentIndex, setcurrentIndex] = useState('')
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        setLoader(true)
        const getTaskType = async () => {
            try {
                const response = await axios({
                    method: 'get',    
                    url: `${REACT_APP_BACKEND_URL}/api/get-connection-type/${id}`,
                    headers: {
                        'Authorization': `${sessionStorage.getItem('AccessToken')}`
                    }        
                  });
            
                setLoader(false)
                setConnectionType(response.data[0])
            }
            catch (error) {
                setLoader(false)
                console.log(error);
            }
        }
        getTaskType();
    }, [])

    const onSubmitHandler = async () => {
        // setLoader(true)
        const payload = {
            ...connectionType
        }
      
        delete payload._id
        try {
            const result = await axios({
                method: 'post',    
                url: `${REACT_APP_BACKEND_URL}/api/edit-connection-type`,
                headers: {
                    'Authorization': `${sessionStorage.getItem('AccessToken')}`
                },   
                data: { connectionType: payload, id }         
              });
            setLoader(false)
            navigate('/connection-type');
            return toast(result.data.message, { autoClose: 2000 });
        } catch (error) {
            setLoader(false)
            return toast(error?.message, { autoClose: 2000 })
        }
    }

    return (
        <div>
            <h1 className="page-head">Edit Connection Type</h1>
            <div className="inner-body-cont">
                <div className="flow-form-cont cont-form-all">
                    <Formik
                        onSubmit={onSubmitHandler}
                        initialValues={{ name: '', description: '' }}
                    >
                        <Form>
                            <div className="row">
                                <div className="form-group col-12">
                                    <div className="label-input-cont">
                                        <p>Task Name</p>
                                        <p className="all-form-fl-w-ip title-edit">{connectionType.name}</p>
                                    </div>
                                    <div className="label-input-cont">
                                        {connectionType?.attributes?.map((attr, index) => {
                                           
                                            return (
                                                <><div className="form-group col-12">
                                                    <div className="label-input-cont">
                                                        <p>Task attribute Name</p>
                                                        <Field className="form-control all-form-fl-w-ip" type="name" name={`attribute_${index + 1}`} required placeholder={`Enter Attribute ${index + 1} Name`} onChange={(e) => {
                                                            const test = [...connectionType?.attributes];
                                                            test[index] = e.target.value
                                                            setConnectionType({
                                                                ...connectionType,
                                                                attributes: test
                                                            });
                                                        }} value={attr} />
                                                        <ErrorMessage name={`attribute_${index + 1}`} component="div" />
                                                    </div>
                                                </div>
                                                </>
                                            )
                                        })}

                                    </div>
                                </div>
                                <div className="submit-cont">
                                    <input type="submit" value="Save" />
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>

            </div>
            {loader && <Loader />}
        </div>
    )
}

export default EditConnectionType