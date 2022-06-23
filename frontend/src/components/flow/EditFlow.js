import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditFlow = () => {

  let navigate = useNavigate()

  const [flowDetails, setFlowDetails] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskTypeAttributes, setTaskTypeAttributes] = useState([]);
  const [selectValue, setSelectValue] = useState('');

  const params = useParams();
  const { id } = params; 

  useEffect(() => {
    const getFlow = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-flow/${id}`)
      setFlowDetails(response.data[0])
      console.log("Flow Details", response.data[0])
    }
    getFlow();
    const getTask = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-task`)
      setTasks(response.data)
      console.log("TASKSSSSS", response.data)
    }
    getTask();
  },[])

  const onSubmitHandler = async (values) => {

    console.log("taskDetails", flowDetails)

    console.log("values", values)

    // const allAttributeDetails = []
    // taskTypeAttributes.map((item) => {
    //   Object.entries(values).map(([key,value]) => {
    //     if(key === item.name) {
    //       allAttributeDetails.push({
    //         key,
    //         fieldRequired: item.fieldRequired,
    //         inputField: item.inputField,
    //         value,
    //       })
    //     }
    //   })
    // })
    // const payload = {
    //   name: values.name,
    //   description: values.description,
    //   taskTypeAttributes: allAttributeDetails,
    //   taskTypeId: selectValue
    // }
    // console.log("PAYLOAD", payload)
    // console.log("taskDetails", values)
    // navigate('/task');
    

    const payload = {
      ...flowDetails
    }
    delete payload._id
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/edit-flow`, {flowDetails: payload, id}) 
      navigate('/flow');   
      return toast(result.data.message);
    } catch (error) {
      return toast(error?.message)      
    }

  }
  const test = (item) => {
    const checking = flowDetails?.tasks.findIndex((_item) => _item === item.name)
    if(checking === -1) return false;
    return true
  }

  return (
    <div>
      <h1 className="page-head">Edit task</h1>
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
                  <p>Flow Name</p>
                  <p className="all-form-fl-w-ip title-edit">{flowDetails.name}</p>
                  {/* <Field className="form-control all-form-fl-w-ip" type="text" name="name" required placeholder={`Enter Attribute value`} onChange={(e) => setFlowDetails({...flowDetails, name: e.target.value})} value={flowDetails.name}/> 
                  <ErrorMessage name="name" component="div" />  */}
                </div>
                <div className="label-input-cont">
                    <p>Description</p>
                    <Field className="form-control all-form-fl-w-ip" component="textarea" required name="description" placeholder="Description here.."  onChange={(e) => setFlowDetails({...flowDetails, description: e.target.value})} value={ flowDetails.description } />       
                    <ErrorMessage name="name" component="div" />    
                </div>
              </div>
              <div className="form-group col-12">
                <div className="label-input-cont">
                      <p>Task</p>
                      <Field className="form-control all-form-fl-w-ip" required component="select" name="tasks" multiple={true} onChange={(e) => { 

                        const newTasks = [];
                        var options = e.target.options;
                        for (var i = 0, l = options.length; i < l; i++) {
                          if (options[i].selected) {
                            newTasks.push(options[i].value);
                          }
                        }
                        setFlowDetails({
                          ...flowDetails, 
                          tasks: newTasks
                        })
                       }} >
                      {
                          tasks.map((item) =>  <option selected={test(item)}>{item.name}</option>)
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
                  <p>VariableSel</p>
                  <Field className="form-control all-form-fl-w-ip" type="name" required name="variableSel" placeholder="Enter Comma Seprated Values" onChange={(e) => setFlowDetails({...flowDetails, variableSel: e.target.value})} value={ flowDetails.variableSel } /> 
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

export default EditFlow