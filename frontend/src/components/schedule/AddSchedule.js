import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../field/customSelect';
import "../../assets/css/multiSelect.css";
export const AddSchedule = () => {
  let navigate = useNavigate()
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    const getFlow = async () => {
      const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-flow`)
      const selectValue = data.map((flow) => {
        return (
          {
            label: flow.name,
            value: flow.name
          }
        )

      })
      setFlows(selectValue)
    }
    getFlow();

  }, [])

  const onSubmitHandler = async (values) => {
    console.log("values", values)
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
                    <div class="outer-input-div">
                    <Field className="form-control all-form-fl-w-ip" type="name" required name="name" placeholder="Enter Schedule Name" />
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
                    <Field className="form-control all-form-fl-w-ip schedule-email-field" type="name" required name="error_Email" placeholder="Email id" />
                  </div>
                </div>
                <div className="form-group col-12 col-md-6">
                  <div className="label-input-cont">
                    <p>Success Email</p>
                    <Field className="form-control all-form-fl-w-ip schedule-email-field" type="name" required name="success_Email" placeholder="Email id" />
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
    </div>
  )

}
export default AddSchedule;