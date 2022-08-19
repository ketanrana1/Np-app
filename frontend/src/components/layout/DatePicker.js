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
    Typography,
    MuiPickersUtilsProvider,
    DatePicker,
    DateFnsUtils
} from '../common/muiImports'
export default function FilterDate() {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state?.flowListChanged?.flowList)

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

                        }}>
                        <Box
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
                                alignItems: "flex-end",
                            }}>
                            <Typography id="transition-modal-title" sx={{ fontWeight: 500 }}>
                                No. of Records: {selector?.runStatusLength ?? 0}
                            </Typography>
                        </Box>

                    </Paper>
                </Grid>
            </Stack>
        </LocalizationProvider>
    );
}

export const ExecuteDatepicker = (props) => {
    const { selectedDate, handleDateChange } = props
    const lastYearDateFormat = new Date(new Date().getFullYear() - 1, 0, 1);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid>
                <DatePicker
                    variant="inline"
                    openTo="month"
                    views={["year", "month"]}
                    label="Year and Month"
                    value={selectedDate}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                    minDate={lastYearDateFormat}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
