import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../field/loader';

const EditTask = () => {

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
          url: `${REACT_APP_BACKEND_URL}/api/get-task/${id}`,
          headers: {
              'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }        
        });
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
        url: `${REACT_APP_BACKEND_URL}/api/edit-task`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        },   
        data: { taskDetails: payload, id }         
      });
      setLoader(false)
      navigate('/task');
      return toast(result.data.message, { autoClose: 2000 });
    } catch (error) {
      setLoader(false)
      return toast(error?.message, { autoClose: 2000 })
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

                  <div className="row">
                    <div className="col-md-6">
                      <div className="label-input-cont">
                    <p>Task Name</p>
                    <p className="all-form-fl-w-ip title-edit">{taskDetails.name}</p>
                  </div>
                    </div>
                    <div className="col-md-6">
                      <div className="label-input-cont">
                    <p>Description</p>
                    <div className="outer-input-div">
                      <Field className="form-control all-form-fl-w-ip" component="textarea" required name="description" placeholder="Description here.." onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })} value={taskDetails.description} />
                      <ErrorMessage className="error-message" name="name" component="div" />
                    </div>
                  </div>
                    </div>
                    <div className="col-md-6">
                      <div className="label-input-cont">
                    <p>Task Type Name</p>
                    <p className="all-form-fl-w-ip title-edit">{taskDetails.taskTypeName}</p>
                  </div>
                    </div>
                {
                  taskDetails?.taskTypeAttributes?.map((item, index) => {
                    return <div className="col-md-6">
                      <div className="label-input-cont">
                        <p>{item.key}</p>
                        <Field className="form-control all-form-fl-w-ip" checked={item.value === true ? "checked" : ""} type={item.inputField} name={item.name} required={item.fieldRequired} placeholder={`Enter Attribute value`}
                          value={item.value}
                          onChange={(e) => {
                            const newAttributes = [...taskDetails.taskTypeAttributes];
                            if (newAttributes[index].inputField === "checkbox") {
                              newAttributes[index].value = !newAttributes[index].value;
                            } else {
                              newAttributes[index].value = e.target.value
                            }
                            setTaskDetails({
                              ...taskDetails,
                              taskTypeAttributes: newAttributes
                            })
                          }
                          }
                        />
                      </div>
                    </div>
                  }
                  )
                }
                    <div className="col-md-12">
                      <div className="submit-cont">
                        <input type="submit" value="Save" />
                      </div>
                    </div>
                  </div>
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

export default EditTask