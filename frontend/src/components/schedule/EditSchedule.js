import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../field/customSelect';
import "../../assets/css/multiSelect.css"
import Loader from '../field/loader';
const EditSchedule = () => {
  const { id } = useParams();
  let navigate = useNavigate()
  var Value = []
  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [flows, setFlows] = useState([]);
  const [loader, setLoader] = useState(false)
  const [options, setOptions] = useState('');

  useEffect(() => {
    setLoader(true)
    const getSchedule = async () => {
      try {
        const response = await axios({
          method: 'get',    
          url: `${REACT_APP_BACKEND_URL}/api/get-schedule/${id}`,
          headers: {
              'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }         
        });
        setLoader(false)
        setScheduleDetails(response.data[0])
        Value.push(...response.data[0]?.flows)
      } catch (error) {
        setLoader(false)
      }
    }
    getSchedule();
    const getFlow = async () => {
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
      setOptions(selectValue)
      setFlows(data)

    }
    getFlow();
  }, [])

  const onSubmitHandler = async (values) => {
    setLoader(true)
    const { flows } = values
    const payload = {
      ...scheduleDetails, flows
    }
    delete payload._id
    try {
      const result = await axios({
        method: 'post',    
        url: `${REACT_APP_BACKEND_URL}/api/edit-schedule`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        },   
        data: { scheduleDetails: payload, id }         
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
      <h1 className="page-head">Edit Schdule</h1>
      <div className="inner-body-cont">
        <div className="flow-form-cont cont-form-all">
          <Formik
            onSubmit={onSubmitHandler}
            initialValues={{ name: '', description: '', flows: Value }}
          >
            <Form>
              <div className="row">
                <div className="form-group col-12">
                  <div className="label-input-cont">
                    <p>Schedule Name</p>
                    <p className="all-form-fl-w-ip title-edit">{scheduleDetails.name}</p>
                  </div>
                  <div className="label-input-cont">
                    <p>Description</p>
                    <div className="outer-input-div">
                    <Field className="form-control all-form-fl-w-ip" type="textarea" required name="description" placeholder="Description here.." onChange={(e) => setScheduleDetails({ ...scheduleDetails, description: e.target.value })} value={scheduleDetails.description} />
                    <ErrorMessage className="error-message" name="name" component="div" />
                    </div>
                  </div>
                </div>
                <div className="label-input-cont col-12">
                  <p>Task</p>
                  <Field
                    className="custom-select-schedule"
                    name="flows"
                    options={options}
                    component={CustomSelect}
                    placeholder="Please Select"
                    isMulti={true}
                  />
                  <ErrorMessage name="flows" component="div" />
                </div>
                <div className="form-group col-12">
                  <div className="label-input-cont">
                    <p>CronPattern</p>
                    <Field className="form-control all-form-fl-w-ip" type="name" required name="cronPattern" placeholder="Cron Pattern" onChange={(e) => setScheduleDetails({ ...scheduleDetails, cronPattern: e.target.value })} value={scheduleDetails.cronPattern} />
                  </div>
                </div>
                <div className="form-group col-12 col-md-6">
                  <div className="label-input-cont">
                    <p>Error Email</p>
                    <Field className="form-control all-form-fl-w-ip schedule-email-field" type="name" required name="error_Email" placeholder="Email id" onChange={(e) => setScheduleDetails({ ...scheduleDetails, error_Email: e.target.value })} value={scheduleDetails.error_Email} />
                  </div>
                </div>
                <div className="form-group col-12 col-md-6">
                  <div className="label-input-cont">
                    <p>Success Email</p>
                    <Field className="form-control all-form-fl-w-ip schedule-email-field" type="name" required name="success_Email" placeholder="Email id" onChange={(e) => setScheduleDetails({ ...scheduleDetails, success_Email: e.target.value })} value={scheduleDetails.success_Email} />
                  </div>
                </div>
                <div className="form-group col-12">
                  <div className="label-input-cont no-outline">
                    <p>Active Flag</p>
                    <Field type="checkbox" checked={scheduleDetails.activeFlag === "true" ? "checked" : ""} name="activeFlag" placeholder="Email id" onChange={(e) => {
                      setScheduleDetails({ ...scheduleDetails, activeFlag: scheduleDetails.activeFlag === "true" ? "false" : "true" })
                    }
                    } />
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

export default EditSchedule