import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
  } from "@mui/material";
  import React from "react";
  
  const FormElementContainer = ({ config, formik, optionsDetails }) => {
    const builder = (individualConfig) => {
      switch (individualConfig.screenElement) {
        case "TextBox":
          let idTextBox = individualConfig.id;
          return (
            <div>
              <InputLabel htmlFor="bootstrap-input">
                {individualConfig.label}
              </InputLabel>
              <TextField
                id={idTextBox}
                fullWidth
                placeholder={"Enter " + individualConfig.label}
                variant="outlined"
                onChange={formik.handleChange}
              // value={formik.values.idTextBox}
              />
            </div>
          );
        case "TextArea":
          let idTextArea = individualConfig.id;
          return (
            <div>
              <InputLabel htmlFor="bootstrap-input">
                {individualConfig.label}
              </InputLabel>
              <TextField
                id={idTextArea}
                multiline
                fullWidth
                placeholder={"Enter " + individualConfig.label}
                variant="outlined"
                rows={2}
                onChange={formik.handleChange}
                value={formik.values.idTextArea}
              />
            </div>
          );
        case "DropDown":
          let idDropDown = individualConfig.id;
          return (
            <>
              <InputLabel htmlFor="bootstrap-input">
                {individualConfig.label}
              </InputLabel>
              <Select
                //value={formik.values.idDropDown}
                id={idDropDown}
                name={individualConfig.name}
                onChange={formik.handleChange}
                fullWidth
              // inputProps={{ "aria-label": "Without label" }}
              >
                
                {optionsDetails.map((item, i) => {
                  if (individualConfig.screenElement === item.screenElement && idDropDown === item.id) {
                    return item.option.map((data, index) => {
                      return (
  
                        <MenuItem key={index} value={data.value}>
                          {data.label}
                        </MenuItem>
                      );
                    })
                  }
                })
                }
              </Select>
            </>
          );
        case "CheckBox":
          let idCheckBox = individualConfig.id;
          return (
            <>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">{individualConfig.label}</FormLabel>
                <FormGroup aria-label="position" row
                  name="radio_name"                
                >
                  {optionsDetails.map((item, i) => {
                    if (individualConfig.screenElement === item.screenElement && idCheckBox === item.id) {
                      return item.option.map((data, index) => {
                        return (
                          <FormControlLabel
                            key={index}                          
                            control={<Checkbox name={data.label} onChange={formik.handleChange}/>}
                            label={data.label}
                            labelPlacement="end"
                          />
                        );
                      })
                    }
                  })
                  }
                </FormGroup>
              </FormControl>
            </>
          );
        case "Radio":
          let idRadio = individualConfig.id;
          // let selectedRadioValue = "";
          // let selectedRadioItem = individualConfig.option.filter(
          //   (item) => item.default_checked === "Yes"
          // );
          // if (selectedRadioItem[0])
          //   selectedRadioValue = selectedRadioItem[0].value;
          return (
            <>
              <FormControl>
                <FormLabel>{individualConfig.label}</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {optionsDetails.map((item, i) => {
                    if (individualConfig.screenElement === item.screenElement && idRadio === item.id) {
                      return item.option.map((data, index) => {
                        return (
                          <FormControlLabel
                            value={data.value}
                            key={index}
                            name={data.label}
                            control={<Radio />}
                            label={data.label}
                            onChange={formik.handleChange}
                          />
                        );
                      })
                    }
                  })
                  }
                </RadioGroup>
              </FormControl>
            </>
          );
        default:
          return <div>Unsupported field</div>;
      }
    };
  
    return (
      <>
        {config.map((c) => {
          return builder(c);
        })}
      </>
    );
  };
  
  export default FormElementContainer;
  