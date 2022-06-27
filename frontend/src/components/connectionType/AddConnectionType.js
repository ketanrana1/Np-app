import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { toast } from 'react-toastify';

const AddConnectionType = () => {

  const [connectionType, setConnectionType] = useState([]);

  const onSubmitHandler = async (values, { resetForm }) => {
    const payload = {
      name: values.name,
      attributes: Array.from(connectionType.map((item, index) => values[`attribute_${index+1}`]))
    }
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/add-connection-type`, payload)
      toast(result.data.message);  
      setConnectionType([])
      resetForm({})
    } catch (error) {
      return toast(error?.message)      
    }
  }

  const removeAttribute = () => {
    const removeAttribute = [...connectionType]
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
                      <p>Connection Type Name</p>
                      <div class="outer-input-div">
                        <Field className="form-control all-form-fl-w-ip" type="name" required name="name" placeholder="Enter Connection Name"/> 
                        <ErrorMessage className="error-message" name="name" component="div" /> 
                      </div>            
                    </div>
                  </div>
                    {
                      connectionType.map((item, index) => {
                      return <div className="form-group col-12">
                                <div className="label-input-cont">
                                <p>Attribute Name</p>
                                <Field className="form-control all-form-fl-w-ip" type="name" name={`attribute_${index + 1}`} required placeholder={`Enter Attribute ${index + 1} Name`} /> 
                                <ErrorMessage name={`attribute_${index+1}`} component="div" /> 
                              </div>                             
                            </div>
                           
                      })
                    }
                    <div className="form-group col-12 pr-0">
                        <div className="label-input-cont">
                          <p></p>
                          {connectionType.length !== 0 && <div className="all-form-fl-w-ip remove-attribute-button" onClick={() => removeAttribute()}>Remove Attribute</div> }                               
                      </div>                  
                    </div>
              
                  <div className="add-conne-type-btn">
                    <a className="add-attribute-btn" onClick={() => setConnectionType([...connectionType, 1])}>Add Attribute</a>
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

export default AddConnectionType
