import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditTask = () => {

  let navigate = useNavigate()
  const [taskDetails, setTaskDetails] = useState([]);
  const [taskTypeAttributes, setTaskTypeAttributes] = useState([]);
  const [selectValue, setSelectValue] = useState('');

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const getTaskType = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-task/${id}`)
      setTaskDetails(response.data[0])
    }
    getTaskType();
  },[]) 

  const onSubmitHandler = async () => {

    console.log("taskDetails")

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
      ...taskDetails
    }
    delete payload._id
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/edit-task`, {taskDetails: payload, id})
      navigate('/task'); 
      return toast(result.data.message);  
    } catch (error) {
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
            initialValues={{ name: '', description: ''}}
          >   
            <Form>
              <div className="row">
              <div className="form-group col-12">
                <div className="label-input-cont">
                  <p>Task Name</p>
                  <p>{taskDetails.name}</p>
                  {/* <Field className="form-control all-form-fl-w-ip" type="text" name="name" required placeholder={`Enter Attribute value`} onChange={(e) => setTaskDetails({...taskDetails, name: e.target.value})} value={taskDetails.name}/> 
                  <ErrorMessage name="name" component="div" />  */}
                </div>
                <div className="label-input-cont">
                    <p>Description</p>
                    <Field className="form-control all-form-fl-w-ip" type="textarea" required name="description" placeholder="Description here.."  onChange={(e) => setTaskDetails({...taskDetails, description: e.target.value})} value={ taskDetails.description } /> 
                    <ErrorMessage name="name" component="div" />    
                </div>
              </div>
              { 
                taskDetails?.taskTypeAttributes?.map((item, index) => {
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

export default EditTask