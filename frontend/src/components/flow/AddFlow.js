import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../field/customSelect';
import "../../assets/css/multiSelect.css"
export const AddFlow = () => {
  let navigate = useNavigate()
  const [tasks, setTasks] = useState([]);
  const [flows, setFlows] = useState([]);
  useEffect(() => {
    const getTask = async () => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-task`)
      setTasks(response.data)
      const selectValue = response?.data?.map((flow) => {
        return (
          {
            label: flow.name,
            value: flow.name
          }
        )

      })
      setFlows(selectValue)
      console.log("TASKSSSSS", response.data)
    }
    getTask();

  }, [])

  const onSubmitHandler = async (values) => {
    console.log("VALUES", values)
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/add-flow`, values)
      navigate('/flow');
      return toast(result.data.message);
    } catch (error) {
      return toast(error?.message)
    }
  }

  return (
    <div>
      <h1 className="page-head">Add Flow</h1>
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
                    <Field className="form-control all-form-fl-w-ip" type="name" required name="name" placeholder="Enter Flow Name" /> 
                    <ErrorMessage name="name" component="div" />    
                  </div>
                  <div className="label-input-cont">
                    <p>Description</p>
                    <Field className="form-control all-form-fl-w-ip" component="textarea" required name="description" placeholder="Description here.." /> 
                    <ErrorMessage name="description" component="div" />    
                  </div>
                  <div className="label-input-cont col-12">
                    <p>Task</p>
                    <Field
                      className="custom-select-schedule"
                      name="flows"
                      options={flows}
                      component={CustomSelect}
                      placeholder="Please Select"
                      isMulti={true}
                    />
                    <ErrorMessage name="flows" component="div" />
                  </div>
                  {/* <div className="label-input-cont">
                    <p>Task</p>
                    <Field className="form-control all-form-fl-w-ip" required component="select" name="tasks" multiple={true} >
                      {
                        tasks.map((item) =>  <option>{item.name}</option>)
                      }
                    </Field> 
                    <ErrorMessage name="connectionType" component="div" />    
                  </div> */}
                </div>
                <div className="form-group col-12">
                  <div className="label-input-cont">
                    <p>VariableSel</p>
                    <Field className="form-control all-form-fl-w-ip" type="name" required name="variableSel" placeholder="Enter Comma Seprated Values" />
                    <ErrorMessage name="name" component="div" />
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
export default AddFlow;