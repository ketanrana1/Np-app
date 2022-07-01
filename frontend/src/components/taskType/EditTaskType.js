import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../field/loader';

const EditTaskType = () => {

    let navigate = useNavigate()
    const [taskDetails, setTaskDetails] = useState([]);
    const [loader, setLoader] = useState(false)
    const [taskTypeAttributes, setTaskTypeAttributes] = useState([]);
    const [selectValue, setSelectValue] = useState('');

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        setLoader(true)
        const getTaskType = async () => {
            try {
                const response = await axios({
                    method: 'get',    
                    url: `${REACT_APP_BACKEND_URL}/api/get-taskType/${id}`,
                    headers: {
                        'Authorization': `${sessionStorage.getItem('AccessToken')}`
                    }        
                  });;
                setLoader(false)
                setTaskDetails(response.data[0])
            }
            catch (error) {
                setLoader(false)
                console.log(error);
            }
        }
        getTaskType();
    }, [])

    const onSubmitHandler = async () => {
        setLoader(true)
        const payload = {
            ...taskDetails
        }
        delete payload._id
        try {
            const result = await axios({
                method: 'post',    
                url: `${REACT_APP_BACKEND_URL}/api/edit-taskType`,
                headers: {
                    'Authorization': `${sessionStorage.getItem('AccessToken')}`
                },   
                data: { taskDetails: payload, id }         
              });
            setLoader(false)
            navigate('/task-type');
            return toast(result.data.message);
        } catch (error) {
            setLoader(false)
            return toast(error?.message)
        }
    }
    return (
        <div>
            <h1 className="page-head">Edit task</h1>
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
                                        <p className="all-form-fl-w-ip title-edit">{taskDetails.name}</p>
                                    </div>
                                    <div className="label-input-cont">

                                        {taskDetails?.attributes?.map((attr, index) => {
                                            const { name, fieldRequired, inputField } = attr
                                            return (
                                                <><div className="form-group col-12">
                                                    <div className="label-input-cont">
                                                        <p>Task attribute Name</p>
                                                        <Field className="form-control all-form-fl-w-ip" type="name" name={`attribute_${index + 1}`} required placeholder={`Enter Attribute ${index + 1} Name`} onChange={(e) => {
                                                            const task = [...taskDetails?.attributes]
                                                            task[index] = { ...attr, name: e.target.value}
                                                            setTaskDetails({
                                                                ...taskDetails, 
                                                                attributes: task
                                                            })
                                                        }} value={name} />
                                                        <ErrorMessage name={`attribute_${index + 1}`} component="div" />
                                                    </div>
                                                </div>
                                                    <div className="form-group col-6 task-type-checkbox">
                                                        <div className="label-input-cont">
                                                            <div role="group" aria-labelledby="my-radio-group">
                                                                <div>Make input text field as:</div><br />
                                                                <label>
                                                                    <Field
                                                                        type="radio"
                                                                        name={`inputField_${index + 1}`}
                                                                        checked={'text' === inputField}
                                                                        
                                                                        onChange={(e) => {
                                                                            const attributesList = [...taskDetails?.attributes]
                                                                            const text = (e.target.value).split('_')[0]
                                                                            attributesList[index] = { ...attr, inputField: text}
                                                                            setTaskDetails({
                                                                                ...taskDetails,
                                                                                attributes: attributesList
                                                                            })
                                                                        }}
                                                                        value={`text_${index + 1}`}
                                                                        required />
                                                                    Text
                                                                </label>
                                                                <br />
                                                                <label>
                                                                    <Field
                                                                        type="radio"
                                                                        name={`inputField_${index + 1}`}
                                                                        checked={'textarea' === inputField}
                                                                        
                                                                        onChange={(e) => {
                                                                            const attributesList = [...taskDetails?.attributes]
                                                                            const text = (e.target.value).split('_')[0]
                                                                            attributesList[index] = { ...attr, inputField: text}
                                                                            setTaskDetails({
                                                                                ...taskDetails,
                                                                                attributes: attributesList
                                                                            })
                                                                        }}
                                                                        value={`textarea_${index + 1}`}
                                                                    />
                                                                    Textarea
                                                                </label><br />
                                                                <label>
                                                                    <Field type="radio"
                                                                        name={`inputField_${index + 1}`}
                                                                        checked={'checkbox' === inputField}
                                                                        
                                                                        onChange={(e) => {
                                                                            const attributesList = [...taskDetails?.attributes]
                                                                            const text = (e.target.value).split('_')[0]
                                                                            
                                                                            attributesList[index] = { ...attr, inputField: text}
                                                                            setTaskDetails({
                                                                                ...taskDetails,
                                                                                attributes: attributesList
                                                                            })
                                                                        }}
                                                                        value={`checkbox_${index + 1}`} />
                                                                    Checkbox
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-6 task-type-checkbox">
                                                        <div className="label-input-cont">
                                                            <div role="group" aria-labelledby="checkbox-group">
                                                                <label>
                                                                    <Field
                                                                        className="checkbox-attribute"
                                                                        checked={!fieldRequired}
                                                                        onChange={(e) => {
                                                                            const attributesList = [...taskDetails?.attributes]
                                                                            attributesList[index] = { name, fieldRequired: !fieldRequired, inputField }
                                                                            setTaskDetails({
                                                                                ...taskDetails,
                                                                                attributes: attributesList
                                                                            })
                                                                        }}
                                                                        type="checkbox"
                                                                        name={`fieldRequired_${index + 1}`}
                                                                        value={`required_${index + 1}`} />
                                                                    Make Input field optional instead of required
                                                                </label>
                                                                <br />
                                                            </div>
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

export default EditTaskType