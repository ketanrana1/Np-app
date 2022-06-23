import { Autocomplete, Chip, TextField, Typography } from '@mui/material';
import React from 'react';
const SelectInput = (props) => {
    const { inputLabel, limitTags, options, value, onChange } = props;
    
    return (
        <>
            <Typography
                variant="p"
                noWrap
                component="div"
                sx={{ mb: 1, width: 180 }}
            >
                {inputLabel}
            </Typography>
            <Autocomplete
                limitTags={limitTags}
                multiple
                id="tags-outlined"
                options={options}
                filterSelectedOptions
                value={value}
                onChange={onChange}
                renderInput={(params) => (
                    <TextField
                    style={{width:"380px"}}
                        {...params}
                        label="Tasks"
                        placeholder="Tasks"
                    />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                        />
                    ))
                }
            />
        </>
    )
}
export default SelectInput;