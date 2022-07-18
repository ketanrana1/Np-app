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
      const response = await axios({
        method: 'get',    
        url: `${REACT_APP_BACKEND_URL}/api/get-connection-type`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        }         
      });
      setConnectionType(response.data)
    }
    getConnectionType();
  },[])


  const handleConnectionTypeChnage = async (e) => {
    setSelectValue(e.target.value)
    try {    
      const result = await axios({
        method: 'get',    
        url: `${REACT_APP_BACKEND_URL}/api/get-connection-type/${e.target.value}`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        }         
      });
      setConnectionTypeAttributes(result.data[0].attributes)
      return toast(result.data.message, { autoClose: 2000 });  
    } catch (error) {
      return toast(error?.message, { autoClose: 2000 })      
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

    console.log("connection payload", payload)
    try {    
      const result = await axios({
        method: 'post',    
        url: `${REACT_APP_BACKEND_URL}/api/add-connection`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        },   
        data: payload         
      });
      navigate('/connection');
      return toast(result.data.message, { autoClose: 2000 });  
    } catch (error) {
      return toast(error?.message, { autoClose: 2000 })      
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
                      <div className="outer-input-div">
                      <Field className="form-control all-form-fl-w-ip" type="name" required name="name" placeholder="Enter Connection Name" /> 
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