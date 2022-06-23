import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AddSchedule = () => {
  let navigate = useNavigate()
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    const getFlow = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-flow`)
      setFlows(response.data)
    }
    getFlow();
    
  },[]) 

  const onSubmitHandler = async (values) => {
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/add-schedule`, values)
      navigate('/schedule');
      return toast(result.data.message);  
    } catch (error) {
      return toast(error?.message)      
    }
  } 

  return (
    <div>
      <h1 className="page-head">Add Schedule</h1>
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
                    <p>Flow Name</p>
                    <Field className="form-control all-form-fl-w-ip" type="name" required name="name" placeholder="Enter Task Name" /> 
                    <ErrorMessage name="name" component="div" />    
                  </div>
                  <div className="label-input-cont">
                    <p>Description</p>
                    <Field className="form-control all-form-fl-w-ip" component="textarea" required name="description" placeholder="Description here.." /> 
                    <ErrorMessage name="description" component="div" />    
                  </div>

                  <div className="label-input-cont">
                    <p>Task</p>
                    <Field className="form-control all-form-fl-w-ip" required component="select" name="flows" multiple={true} >
                      {
                        flows.map((item) =>  <option>{item.name}</option>)
                      }
                    </Field> 
                    <ErrorMessage name="connectionType" component="div" />    
                  </div>
                </div>
                  <div className="form-group col-12">
                    <div className="label-input-cont">
                      <p>CronPattern</p>
                      <Field className="form-control all-form-fl-w-ip" type="name" required name="cronPattern" placeholder="Cron Pattern" /> 
                      <ErrorMessage name="name" component="div" />    
                    </div>
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <div className="label-input-cont">
                      <p>Error Email</p>
                      <Field className="form-control all-form-fl-w-ip schedule-email-field" type="name" required name="error_Email" placeholder="Email id" /> 
                      <ErrorMessage name="name" component="div" />    
                    </div>
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <div className="label-input-cont">
                      <p>Success Email</p>
                      <Field className="form-control all-form-fl-w-ip schedule-email-field" type="name" required name="success_Email" placeholder="Email id" /> 
                      <ErrorMessage name="name" component="div" />    
                    </div>
                  </div>
                  <div className="form-group col-12">
                    <div className="label-input-cont">
                      <p>Active Flag</p>
                      <Field className="form-control all-form-fl-w-ip checbox-schedule-active" type="checkbox" name="activeFlag" placeholder="Email id" /> 
                      <ErrorMessage name="name" component="div" /><span className="checkbox-schedule-span">Active</span>     
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
    </div>
  )

}
  export default AddSchedule;