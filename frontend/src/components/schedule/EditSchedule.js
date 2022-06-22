import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditSchedule = () => {

  let navigate = useNavigate()

  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [flows, setFlows] = useState([]);
  // const [taskTypeAttributes, setTaskTypeAttributes] = useState([]);
  const [selectValue, setSelectValue] = useState('');

  const params = useParams();
  const { id } = params; 

  useEffect(() => {
    const getSchedule = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-schedule/${id}`)
      setScheduleDetails(response.data[0])
      console.log("Schedule Details", response.data[0])
    }
    getSchedule();
    const getFlow = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-flow`)
      console.log("Flows", response.data)
      setFlows(response.data)
      
    }
    getFlow();
  },[]) 

  const onSubmitHandler = async (values) => {

    console.log("scheduleDetails", scheduleDetails)

    console.log("values", values)
    const payload = {
      ...scheduleDetails
    }
    delete payload._id
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/edit-schedule`, {scheduleDetails: payload, id}) 
      navigate('/schedule');   
      return toast(result.data.message);
    } catch (error) {
      return toast(error?.message)      
    }

  }
  const test = (item) => {
    console.log("agasdg", scheduleDetails)
    const checking = scheduleDetails?.flows.findIndex((_item) => _item === item.name)
    if(checking === -1) return false;
    return true
  }

  console.log("scheduleDetails", scheduleDetails)

  return (
    <div>
      <h1 className="page-head">Edit Schdule</h1>
      <div className="inner-body-cont">
      <div className="flow-form-cont cont-form-all">
        <Formik
            onSubmit={onSubmitHandler}
            initialValues={{ name: '', description: ''}}
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
                    <Field className="form-control all-form-fl-w-ip" type="textarea" required name="description" placeholder="Description here.."  onChange={(e) => setScheduleDetails({...scheduleDetails, description: e.target.value})} value={ scheduleDetails.description } />       
                    <ErrorMessage name="name" component="div" />    
                </div>
              </div>
              <div className="form-group col-12">
                <div className="label-input-cont">
                      <p>Flow</p>
                      <Field className="form-control all-form-fl-w-ip" required component="select" name="tasks" multiple={true} onChange={(e) => { 

                        const newFlows = [];
                        var options = e.target.options;
                        for (var i = 0, l = options.length; i < l; i++) {
                          if (options[i].selected) {
                            newFlows.push(options[i].value);
                          }
                        }
                        setScheduleDetails({
                          ...scheduleDetails, 
                          flows: newFlows
                        }) 
                       }} >
                      {
                          flows?.map((item) =>  <option selected={test(item)}>{item?.name}</option>)
                      }
                      </Field>
                      <ErrorMessage name="connectionType" component="div" /> 
                </div>
              </div>
              
              {/* { 
                flowDetails?.taskTypeAttributes?.map((item, index) => {
                return <div className="form-group col-12">
                          <div className="label-input-cont">
                            <p>{item.key}</p>
                            <Field className="form-control all-form-fl-w-ip" checked={ item.value === true ? "checked" : ""} type={item.inputField} name={item.name} required={ item.fieldRequired } placeholder={`Enter Attribute value`} 
                            value={ item.value } 
                            onChange={(e) => {
                                const test = [...taskDetails.taskTypeAttributes];
                                if(test[index].inputField === "checkbox"){
                                  test[index].value = !test[index].value;
                                } else {
                                  test[index].value = e.target.value
                                }
                                setTaskDetails({
                                ...taskDetails, 
                                taskTypeAttributes: test
                              })
                            }
                          }
                          /> 
                        </div>
                      </div>
                }
                )
              } */}
              <div className="form-group col-12">
                    <div className="label-input-cont">
                      <p>CronPattern</p>
                      <Field className="form-control all-form-fl-w-ip" type="name" required name="cronPattern" placeholder="Cron Pattern" onChange={(e) => setScheduleDetails({...scheduleDetails, cronPattern: e.target.value})} value={ scheduleDetails.cronPattern } />     
                    </div>
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <div className="label-input-cont">
                      <p>Error Email</p>
                      <Field className="form-control all-form-fl-w-ip schedule-email-field" type="name" required name="error_Email" placeholder="Email id" onChange={(e) => setScheduleDetails({...scheduleDetails, error_Email: e.target.value})} value={ scheduleDetails.error_Email } />    
                    </div>
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <div className="label-input-cont">
                      <p>Success Email</p>
                      <Field className="form-control all-form-fl-w-ip schedule-email-field" type="name" required name="success_Email" placeholder="Email id" onChange={(e) => setScheduleDetails({...scheduleDetails, success_Email: e.target.value})} value={ scheduleDetails.success_Email } />    
                    </div>
                  </div>
                  <div className="form-group col-12">
                    <div className="label-input-cont">
                      <p>Active Flag</p>
                      <Field className="form-control all-form-fl-w-ip" type="checkbox" checked={ scheduleDetails.activeFlag === "true" ? "checked" : ""} name="activeFlag" placeholder="Email id" onChange={(e) =>  {

                        setScheduleDetails({...scheduleDetails, activeFlag: scheduleDetails.activeFlag === "true" ? "false" : "true" })

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
    </div>
  )
}

export default EditSchedule