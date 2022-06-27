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

const EditFlow = () => {

  let navigate = useNavigate()
  var Value = []
  const [flowDetails, setFlowDetails] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loader, setLoader] = useState(false)
  const [options, setOptions] = useState('');

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setLoader(true)
    const getFlow = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-flow/${id}`)
        setLoader(false)
        setFlowDetails(response.data[0])
        Value.push(...response.data[0]?.tasks)
      } catch (error) {
        setLoader(false)
        console.log(error);
      }
    
    }
    getFlow();
    const getTask = async () => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-task`)
      setTasks(response.data)
      const selectValue = response?.data?.map((task) => {
        return (
          {
            label: task.name,
            value: task.name
          }
        )
      })
      setOptions(selectValue)
    }
    getTask();
  }, [])

  const onSubmitHandler = async (values) => {
    setLoader(true)
    const { tasks } = values
    const payload = {
      ...flowDetails, tasks
    }
    delete payload._id
    try {
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/edit-flow`, { flowDetails: payload, id })
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
      <h1 className="page-head">Edit task</h1>
      <div className="inner-body-cont">
        <div className="flow-form-cont cont-form-all">
          <Formik
            onSubmit={onSubmitHandler}
            initialValues={{ name: '', description: '', tasks: Value }}
          >
            <Form>
              <div className="row">
                <div className="form-group col-12">
                  <div className="label-input-cont">
                    <p>Flow Name</p>
                    <p className="all-form-fl-w-ip title-edit">{flowDetails.name}</p>
                  </div>
                  <div className="label-input-cont">
                    <p>Description</p>
                    <div class="outer-input-div">
                    <Field className="form-control all-form-fl-w-ip" component="textarea" required name="description" placeholder="Description here.." onChange={(e) => setFlowDetails({ ...flowDetails, description: e.target.value })} value={flowDetails.description} />
                    <ErrorMessage className="error-message" name="name" component="div" />
                    </div>
                  </div>
                </div>
                <div className="label-input-cont col-12">
                  <p>Task</p>
                  <Field
                    className="custom-select-schedule"
                    name="tasks"
                    options={options}
                    component={CustomSelect}
                    placeholder="Please Select"
                    isMulti={true}
                  />
                  <ErrorMessage name="tasks" component="div" />
                </div>
                <div className="form-group col-12">
                  <div className="label-input-cont">
                    <p>VariableSel</p>
                    <Field className="form-control all-form-fl-w-ip" type="name" required name="variableSel" placeholder="Enter Comma Seprated Values" onChange={(e) => setFlowDetails({ ...flowDetails, variableSel: e.target.value })} value={flowDetails.variableSel} />
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
      {loader && <Loader/>}
    </div>
  )
}

export default EditFlow