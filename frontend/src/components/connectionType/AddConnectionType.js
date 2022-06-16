import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../common/environment';

const initialResponseState = [];

const AddConnectionType = () => {

  const [responseState, setResponseState] = useState(initialResponseState);
  const [connectionType, setConnectionType] = useState([]);

  useEffect(() => {
    const getConnectionType = async() => {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/get-connection-type`)
      setConnectionType(response.data)
    }
    getConnectionType();
  },[])

  console.log("connectionType", connectionType)

    return (
        <>
      <div>
      <h1 className="page-head">Add Connection Type</h1>
       <div className="inner-body-cont">
 
      <Formik
  
        initialValues={{ name: '', attributes: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
  
            errors.name = 'Name is Required';
  
          }
          return errors;
  
        }}
  
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
  
  
          try {
            
            const request = await axios({
            method: 'post',    
            url: 'http://localhost:5000/api/add-connection-type',
            data: values,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `${sessionStorage.getItem('token')}`
  
            }            
            });
            setResponseState(request); 
        } catch (error) {
            console.log(error)  
        }
  
        }}

      >
      <Form>
          <Field type="name" name="name" placeholder="Enter Connection Name" />
          <ErrorMessage name="name" component="div" />
  
          <Field type="text-area" name="attributes" placeholder="Enter comma seprated atrribute names" />
          <ErrorMessage name="attributes" component="div" />
          <br/><button type="submit" >
          Submit
          </button>
      </Form>
      </Formik>
      </div>
    </div>
    </>
    )

}

export default AddConnectionType
