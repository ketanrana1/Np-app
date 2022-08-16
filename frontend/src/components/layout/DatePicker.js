import { useSelect } from '@mui/base';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterFromDate, filterToDate } from '../../redux/actions/runningStatusAction';

import {
    LocalizationProvider,
    DesktopDatePicker,
    AdapterDateFns,
    TextField,
    Stack,
    Grid,
    Paper,
    Box,
    Typography
} from '../common/muiImports'

export default function FilterDate(props) {
    const { runStatusLength } = useSelector((state) => state?.flowListChanged?.flowList)
    console.log("runStatusLength", runStatusLength)
    const dispatch = useDispatch()
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const handelFromDate = (date) => {
        dispatch(filterFromDate(new Date(date).getTime()))
        setFromDate(date);
    };
    const handleToDate = (date) => {
        setToDate(date);
        dispatch(filterToDate(new Date(date).getTime()))
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            mb: 2,
                            display: "flex",
                            justifyContent: "space-between"

                        }}
                    ><Box
                        sx={{
                            display: "flex",
                            flexDirection: 'column',
                        }}>
                            <p className="monitor-table-head">Filter Run status </p>
                            <div>
                                <DesktopDatePicker
                                    label="From"
                                    inputFormat="MM/dd/yyyy"
                                    value={fromDate}
                                    onChange={handelFromDate}
                                    renderInput={(params) => <TextField {...params} />}

                                />
                                <DesktopDatePicker
                                    label="To"
                                    inputFormat="MM/dd/yyyy"
                                    value={toDate}
                                    onChange={handleToDate}
                                    renderInput={(params) => <TextField {...params} />}
                                    sx={{ ml: 2 }}
                                />
                            </div>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems:"flex-end"
                            }}>
                            <Typography id="transition-modal-title" sm={{fontWeight: ""}}>
                                No. of Records: {runStatusLength}
                            </Typography>
                        </Box>

                    </Paper>
                </Grid>
            </Stack>
        </LocalizationProvider>
    );
}
