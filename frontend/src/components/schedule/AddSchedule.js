import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../field/customSelect';
import "../../assets/css/multiSelect.css";
import Loader from '../field/loader';
export const AddSchedule = () => {
  let navigate = useNavigate()
  const [flows, setFlows] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    const getFlow = async () => {
      try {
        const { data } = await axios({
          method: 'get',    
          url: `${REACT_APP_BACKEND_URL}/api/get-flow`,
          headers: {
              'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }        
        });
        setLoader(false)
        const selectValue = data.map((flow) => {
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
    getFlow();

  }, [])

  const onSubmitHandler = async (values) => {
    setLoader(true)
    try {
      const result = await axios({
        method: 'post',    
        url: `${REACT_APP_BACKEND_URL}/api/add-schedule`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        },   
        data: values         
      });
      setLoader(false)
      navigate('/schedule');
      return toast(result.data.message, { autoClose: 2000 });
    } catch (error) {
      setLoader(false)
      return toast(error?.message, { autoClose: 2000 })
    }
  }

  return (
    <div>
      <h1 className="page-head">Add Schedule</h1>
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
                    <p>Schedule Name</p>
                    <div className="outer-input-div">
                      <Field className="form-control all-form-fl-w-ip" type="name" required name="name" placeholder="Enter Schedule Name" />
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

                  <div className="label-input-cont col-12">
                    <p>Flow</p>
                    <Field
                      className="custom-select-schedule"
                      name="flows"
                      label="Task"
                      options={flows}
                      component={CustomSelect}
                      placeholder="Please Select"
                      isMulti={true}
                    />
                    <ErrorMessage name="flows" component="div" />
                  </div>
                </div>
                <div className="form-group col-12">
                  <div className="label-input-cont">
                    <p>CronPattern</p>
                    <Field className="form-control all-form-fl-w-ip" type="name" required name="cronPattern" placeholder="Cron Pattern" />
                  </div>
                </div>
                <div className="form-group col-12 col-md-6">
                  <div className="label-input-cont">
                    <p>Error Email</p>
                    <Field className="form-control all-form-fl-w-ip schedule-email-field" type="name" name="error_Email" placeholder="Email id" />
                  </div>
                </div>
                <div className="form-group col-12 col-md-6">
                  <div className="label-input-cont">
                    <p>Success Email</p>
                    <Field className="form-control all-form-fl-w-ip schedule-email-field" type="name" name="success_Email" placeholder="Email id" />
                  </div>
                </div>
                <div className="form-group col-12">
                  <div className="label-input-cont">
                    <p>Active Flag</p>
                    <Field type="checkbox" name="activeFlag" placeholder="Email id" />
                    <span className="checkbox-schedule-span">Active</span>
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
export default AddSchedule;