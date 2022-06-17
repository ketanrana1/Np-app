import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AddConnection = () => {
  let navigate = useNavigate()
  const [connectionType, setConnectionType] = useState([]);
  const [connectionTypeAttributes, setConnectionTypeAttributes] = useState([]);
  const [selectValue, setSelectValue] = useState('');


  useEffect(() => {
    const getConnectionType = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-connection-type`)
      setConnectionType(response.data)
    }
    getConnectionType();
  },[])


  const handleConnectionTypeChnage = async (e) => {
    setSelectValue(e.target.value)
    try {    
      const result = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-connection-type/${e.target.value}`)
      setConnectionTypeAttributes(result.data[0].attributes)
      return toast(result.data.message);  
    } catch (error) {
      return toast(error?.message)      
    }
  }

  const onSubmitHandler = async (values) => {
    const newValues = {...values};
    delete newValues.name
    delete newValues.description
    const payload = {
      name: values.name,
      description: values.description,
      connectionTypeAttributes: newValues,
      connectionTypeId: selectValue
    }
    try {    
      const result = await axios.post(`${REACT_APP_BACKEND_URL}/api/add-connection`, payload)
      navigate('/connection');
      return toast(result.data.message);  
    } catch (error) {
      return toast(error?.message)      
    }
  }

  return (
    <div>
      <h1 className="page-head">Add Connection</h1>
      <div className="inner-body-cont">
        <div className="flow-form-cont cont-form-all">
          <Formik
            initialValues={{ name: '', description: ''}}
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
                    <p>Connection Name</p>
                    <Field className="form-control all-form-fl-w-ip" type="name" required name="name" placeholder="Enter Connection Name" /> 
                    <ErrorMessage name="name" component="div" />    
                  </div>
                  <div className="label-input-cont">
                    <p>Description</p>
                    <Field className="form-control all-form-fl-w-ip" type="textarea" required name="description" placeholder="Description here.." /> 
                    <ErrorMessage name="name" component="div" />    
                  </div>

                  <div className="label-input-cont">
                    <p>Select Type</p>
                    <Field onChange={handleConnectionTypeChnage} className="form-control all-form-fl-w-ip" as="select" value={selectValue} >
                      <option value="" selected disabled >Select Connection Type</option>
                      {
                        connectionType.map((item) =>  <option value={item.connectionTypeId}>{item.name}</option>)
                      }
                    </Field>
                    <ErrorMessage name="connectionType" component="div" />    
                  </div>

                </div>
                  {
                    connectionTypeAttributes.map((item, index) => {
                    return <div className="form-group col-12">
                              <div className="label-input-cont">
                              <p>{ item }</p>
                              <Field className="form-control all-form-fl-w-ip" type="name" name={item} required placeholder={`Enter Attribute value`} />    
                            </div>
                          </div>
                    })
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
  export default AddConnection;