import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
const initialResponseState = [];

const AddConnectionType = () => {

    
    const [responseState, setResponseState] = useState(initialResponseState);

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
          console.log("VALUES", values)
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
            console.log("REQUEST", request, responseState);
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
