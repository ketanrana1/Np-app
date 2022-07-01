import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../field/customSelect';
import "../../assets/css/multiSelect.css"
import Loader from '../field/loader';
export const AddFlow = () => {
  let navigate = useNavigate()
  const [tasks, setTasks] = useState([]);
  const [flows, setFlows] = useState([]);
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    const getTask = async () => {
      try {
        const response = await axios({
          method: 'get',    
          url: `${REACT_APP_BACKEND_URL}/api/get-task`,
          headers: {
              'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }         
        });
        setLoader(false)
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
      } catch (error) {
        setLoader(false)
        console.log(error);
      }

    }
    getTask();

  }, [])

  const onSubmitHandler = async (values) => {
    setLoader(true)
    try {
      const result = await axios({
        method: 'post',    
        url: `${REACT_APP_BACKEND_URL}/api/add-flow`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        },   
        data: values         
      });
      setLoader(false)
      navigate('/flow');
      return toast(result.data.message);
    } catch (error) {
      setLoader(false)
      return toast(error?.message)
    }
  }

  return (
    <div>
      <h1 className="page-head">Add Flow</h1>
      <div className="inner-body-cont">
        <div className="flow-form-cont cont-form-all">
          <Formik
            initialValues={{ name: '', description: '', tasks: [] }}
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
                    <div class="outer-input-div">
                      <Field className="form-control all-form-fl-w-ip" type="name" required name="name" placeholder="Enter Flow Name" />
                      <ErrorMessage className="error-message" name="name" component="div" />
                    </div>
                  </div>
                  <div className="label-input-cont">
                    <p>Description</p>
                    <div class="outer-input-div">
                      <Field className="form-control all-form-fl-w-ip" component="textarea" required name="description" placeholder="Description here.." />
                      <ErrorMessage className="error-message" name="description" component="div" />
                    </div>
                  </div>
                  <div className="label-input-cont col-12">
                    <p>Task</p>
                    <Field
                      className="custom-select-schedule"
                      name="tasks"
                      options={flows}
                      component={CustomSelect}
                      placeholder="Please Select"
                      isMulti={true}
                    />
                    <ErrorMessage name="tasks" component="div" />
                  </div>
                </div>
                <div className="form-group col-12">
                  <div className="label-input-cont">
                    <p>VariableSel</p>
                    <Field className="form-control all-form-fl-w-ip" type="name" required name="variableSel" placeholder="Enter Comma Seprated Values" />
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
      {loader && <Loader/>}
    </div>
  )

}
export default AddFlow;