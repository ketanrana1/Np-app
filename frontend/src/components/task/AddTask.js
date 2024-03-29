import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../field/loader';

const AddTask = () => {

  let navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [taskType, setTaskType] = useState([]);
  const [taskTypeAttributes, setTaskTypeAttributes] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [taskTypeName, setTaskTypeName] = useState('')


  useEffect(() => {
    setLoader(true)
    const getTaskType = async () => {
      try {
        const response = await axios({
          method: 'get',    
          url: `${REACT_APP_BACKEND_URL}/api/get-task-type`,
          headers: {
              'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }       
        });
        setLoader(false)
        setTaskType(response.data)
      } catch (error) {
        setLoader(false)
        console.log(error);
      }
    }
    getTaskType();
  }, [])


  const handleTaskTypeChnage = async (e) => {
    setLoader(true)
    setSelectValue(e.target.value)
    try {
      const result = await axios({
        method: 'get',    
        url: `${REACT_APP_BACKEND_URL}/api/get-task-type/${e.target.value}`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        }       
      });
      setLoader(false)
      setTaskTypeAttributes(result.data[0].attributes)
      setTaskTypeName(result.data[0].name)
      return toast(result.data.message, { autoClose: 2000 });
    } catch (error) {
      setLoader(false)
      return toast(error?.message, { autoClose: 2000 })
    }
  }

  const onSubmitHandler = async (values) => {
    setLoader(true)
    const allAttributeDetails = []
    taskTypeAttributes.map((item) => {
      Object.entries(values).map(([key, value]) => {
        if (key === item.name) {
          allAttributeDetails.push({
            key,
            fieldRequired: item.fieldRequired,
            inputField: item.inputField,
            value,
          })
        }
      })
    })
    const payload = {
      name: values.name,
      description: values.description,
      taskTypeAttributes: allAttributeDetails,
      taskTypeId: selectValue,
      taskTypeName: taskTypeName,
    }

    try {
      const result = await axios({
        method: 'post',    
        url: `${REACT_APP_BACKEND_URL}/api/add-task`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        },   
        data: payload         
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
      <h1 className="page-head">Add Task</h1>
      <div className="inner-body-cont">
        <div className="flow-form-cont cont-form-all">
          <Formik
            initialValues={{ name: '', description: '' }}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Name is Required';
              } if (!values.description) {
                errors.description = 'Description is Required';
              }
              return errors;
            }}
            onSubmit={onSubmitHandler}
          >
            <Form>
              <div className="row">
                <div className="form-group col-12">
                  <div className="label-input-cont">
                    <p>Task Name</p>
                    <div className="outer-input-div">
                      <Field className="form-control all-form-fl-w-ip" type="name" required name="name" placeholder="Enter Task Name" />
                      <ErrorMessage className="error-message" name="name" component="div" />
                    </div>
                  </div>
                  <div className="label-input-cont">
                    <p>Description</p>
                    <div className="outer-input-div">
                      <Field className="form-control all-form-fl-w-ip" component="textarea" required name="description" placeholder="Description here.." />
                      <ErrorMessage className="error-message" name="description" component="div" />
                    </div>
                  </div>

                  <div className="label-input-cont">
                    <p>Select Type</p>
                    <Field onChange={handleTaskTypeChnage} className="form-control all-form-fl-w-ip" as="select" value={selectValue} >
                      <option value="" selected disabled >Select Task Type</option>
                      {
                        taskType.map((item) => <option value={item.taskTypeId}>{item.name}</option>)
                      }
                    </Field>
                    <ErrorMessage name="connectionType" component="div" />
                  </div>

                </div>
                {
                  taskTypeAttributes.map((item, index) => {
                    return <div className="form-group col-12">
                      <div className="label-input-cont">
                        <p>{item.name}</p>
                        <Field className="form-control all-form-fl-w-ip" type={item.inputField} name={item.name} required={item.fieldRequired} placeholder={`Enter Attribute value`} />
                      </div>
                    </div>
                  })
                }
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


export default AddTask