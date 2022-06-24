import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { toast } from 'react-toastify';
import Loader from '../field/loader';

const AddTaskType = () => {

  const [taskType, setConnectionType] = useState([]);
  const [loader, setLoader] = useState(false)
  const onSubmitHandler = async (values, { resetForm }) => {
    setLoader(true)
    console.log("VALUES", values)
    const check = []
    taskType.map((item, index) => {
       const payload = {
          name: values[`attribute_${index + 1}`],
          fieldRequired: typeof values[`fieldRequired_${index + 1}`] === "undefined" ? false : true,
          inputField: values[`inputField_${index + 1}`]?.split('_')[0] 
      }

      console.log("PAYLOAD", payload)
      check.push(payload)
    }) 

    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/add-task-type`, { 
        name: values.name,
        attributes: check
      })
      setLoader(false)
      toast(result.data.message);  
      setConnectionType([])
      resetForm({})
    } catch (error) {
      setLoader(false)
      return toast(error?.message)      
    }
  }

  const removeAttribute = () => {
    const removeAttribute = [...taskType]
    removeAttribute.pop()
    setConnectionType(removeAttribute)
  }


  return (
    <div>
        <h1 className="page-head">Add Type</h1>
        <div className="inner-body-cont">
          <div className="flow-form-cont cont-form-all">
            <Formik
              initialValues={{ name: '', attribute_1: '' }}
              validate={values => {
                const errors = {};
                if (!values.name) {
                  errors.name = 'Name is Required';
                }
                return errors;
              }}
              onSubmit={onSubmitHandler}
            >   
              <Form>
                <div className="row">
                  <div className="form-group col-12">
                      <div className="label-input-cont">
                      <p>Task Type Name</p>
                      <div class="outer-input-div">
                      <Field className="form-control all-form-fl-w-ip" type="name" required name="name" placeholder="Enter Task Name"/> 
                      <ErrorMessage className="error-message" name="name" component="div" /> 
                      </div>  
                    </div>
                  </div>
                    {
                      taskType.map((item, index) => {
                      return <><div className="form-group col-12">
                                <div className="label-input-cont">
                                <p>Task attribute Name</p>
                                <Field className="form-control all-form-fl-w-ip" type="name" name={`attribute_${index + 1}`} required placeholder={`Enter Attribute ${index + 1} Name`} />
                                <ErrorMessage name={`attribute_${index+1}`} component="div" />     
                              </div>
                            </div>
                            <div className="form-group col-6 task-type-checkbox">
                              <div className="label-input-cont">
                              <div role="group" aria-labelledby="my-radio-group">
                              <div>Make input text field as:</div><br/>
                                <label>
                                  <Field type="radio" name={`inputField_${index + 1}`} value={`text_${index + 1}`} required />
                                  Text
                                </label><br/>
                                <label>
                                  <Field type="radio" name={`inputField_${index + 1}`} value={`textarea_${index + 1}`} />
                                 Textarea
                                </label><br/>
                                <label>
                                  <Field type="radio" name={`inputField_${index + 1}`} value={`checkbox_${index + 1}`} />
                                  Checkbox
                                </label>                               
                              </div>
                              </div>
                            </div>
                            <div className="form-group col-6 task-type-checkbox">
                              <div className="label-input-cont">
                                <div role="group" aria-labelledby="checkbox-group">
                                <label>
                                  <Field className="checkbox-attribute" type="checkbox" name={`fieldRequired_${index + 1}`} value={`required_${index + 1}`} />
                                  Make Input field optional instead of required
                                </label><br/>
                              </div>
                              </div>
                            </div>
                            </>
                      })
                    }
                    <div className="form-group col-12 pr-0">
                        <div className="label-input-cont">
                        <p></p>
                        {taskType.length !== 0 && <div className="all-form-fl-w-ip remove-attribute-button" onClick={() => removeAttribute()}>Remove Attribute</div> }                               
                      </div>                  
                    </div>
                  <div className="add-conne-type-btn">
                    <button onClick={() => setConnectionType([...taskType, 1])}>Add Attribute</button>
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

export default AddTaskType