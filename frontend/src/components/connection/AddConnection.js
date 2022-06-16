import React, { useState } from 'react'
import { useFormik } from "formik";
import schemas from "../../Schema_JSON/schema.json";
import options from "../../Schema_JSON/option.json";
import FormElementContainer from "../../components/FormElementContainer";
import * as yup from "yup";
import { Button, InputLabel } from "@mui/material";


const AddConnection = () => {


  const formik = useFormik({
    initialValues: {
    },
    onSubmit: values => {
      let data = {};
      let connection = [];
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          const element = values[key];
          if (Array.isArray(element)) {
            if (element.length != 0) {
              connection.push(key)
            }
          }
          else {
            data[key] = element;
          }
        }
      }
      data["connection"] = connection;
      console.log(data);      
    },
  });

  return (
    <div>
      <h1 className="page-head">Add Connection</h1>
      <div className="inner-body-cont">
        <div className="flow-form-cont cont-form-all">
        <form onSubmit={formik.handleSubmit}>
            <InputLabel htmlFor="bootstrap-input" color="info">
              {schemas.myForm.formLabel}
            </InputLabel>
            <FormElementContainer
              config={schemas.myForm.fields}
              formTitle={schemas.myForm.formLabel}
              formik={formik}
              optionsDetails={options.myFormOptions.optionsList}
            />
            <div>
              <Button variant="contained" type="submit">Submit</Button>
            </div>
          </form>
        </div>
        </div>
    </div>
    
  )
}
  export default AddConnection;