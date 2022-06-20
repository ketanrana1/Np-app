import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {

  let navigate = useNavigate()
  const [taskType, setTaskType] = useState([]);
  const [taskTypeAttributes, setTaskTypeAttributes] = useState([]);
  const [selectValue, setSelectValue] = useState('');


  useEffect(() => {
    const getTaskType = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-task-type`)
      setTaskType(response.data)
    }
    getTaskType();
  },[])

 
  const handleTaskTypeChnage = async (e) => {
    setSelectValue(e.target.value)
    try {    
      const result = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-task-type/${e.target.value}`)
      setTaskTypeAttributes(result.data[0].attributes)
      console.log("RESULT", result.data[0].attributes)
      return toast(result.data.message);  
    } catch (error) {
      return toast(error?.message)      
    }
  }

  const onSubmitHandler = async (values) => {
    const newValues = {...values};
    delete newValues.name
    delete newValues.description
    const payload = {
      name: values.name,
      description: values.description,
      taskTypeAttributes: newValues,
      taskTypeId: selectValue
    }
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/add-task`, payload)
      navigate('/task');
      return toast(result.data.message);  
    } catch (error) {
      return toast(error?.message)      
    }
  }
 
  return (
    <div>
      <h1 className="page-head">Add Task</h1>
      <div className="inner-body-cont">
        <div className="flow-form-cont cont-form-all">
          <Formik
            initialValues={{ name: '', description: ''}}
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
                    <Field className="form-control all-form-fl-w-ip" type="name" required name="name" placeholder="Enter Task Name" /> 
                    <ErrorMessage name="name" component="div" />    
                  </div>
                  <div className="label-input-cont">
                    <p>Description</p>
                    <Field className="form-control all-form-fl-w-ip" type="textarea" required name="description" placeholder="Description here.." /> 
                    <ErrorMessage name="name" component="div" />    
                  </div>

                  <div className="label-input-cont">
                    <p>Select Type</p>
                    <Field onChange={handleTaskTypeChnage} className="form-control all-form-fl-w-ip" as="select" value={selectValue} >
                      <option value="" selected disabled >Select Task Type</option>
                      {
                        taskType.map((item) =>  <option value={item.taskTypeId}>{item.name}</option>)
                      }
                    </Field>
                    <ErrorMessage name="connectionType" component="div" />    
                  </div>

                </div>
                  {
                    taskTypeAttributes.map((item, index) => {
                    return <div className="form-group col-12">
                              <div className="label-input-cont">
                              <p>{ item.name }</p>
                              <Field className="form-control all-form-fl-w-ip" type={item.inputField} name={item.name} required={ item.fieldRequired } placeholder={`Enter Attribute value`} /> 
                              {/* <Field className="form-control all-form-fl-w-ip" type="name" name={item} required placeholder={`Enter Attribute value`} />     */}
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
    </div>
  )
}


export default AddTask