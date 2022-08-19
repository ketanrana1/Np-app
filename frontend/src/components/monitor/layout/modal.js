import { useDispatch } from 'react-redux';
import { runningStatus } from '../../../redux/actions/runningStatusAction';
import { addRunStatus } from '../../../api/recentRun';
import { addTaskStatus, getTaskType } from '../../../api/tasksDetails';
import { Fade, Backdrop, Modal, Grid, Box, Typography, Button, CloseIcon, Divider } from "../../common/muiImports"
import { ExecuteDatepicker } from '../../layout/DatePicker';
import { useState } from 'react';
import { formatDate } from '../../field/dateFormat';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
};

export default function ExecuteModal(props) {
    const dispatch = useDispatch()
    const { name, flowId, tasks, variableSel } = props?.flowName
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => { setSelectedDate(date) };
    const handleClose = () => props.OpenExecuteModal(false);
    const handleExecuteClick = async (id, name, closePopup) => {
        const currentTime = new Date().toLocaleString()
        const paylaod = {
            "ranAt": currentTime,
            "startTime": currentTime,
            "flowName": name,
            "flowId": id,
            "endTime": "",
            "status": "In progress"
        }

        const result = await addRunStatus(paylaod)
        const splitSelectedMonthPeriod = formatDate(selectedDate).split("-")[1]
        tasks.map(async (task) => {
            const { data } = await getTaskType(task)
            const singleTaskLogDataPayload = {
                "taskName": task,
                "taskType": data[0]?.taskTypeName,
                "ranAt": currentTime,
                "startTime": currentTime,
                "selectedMonthPeriod": splitSelectedMonthPeriod,
                "endTime": "",
                "status": "In progress",
                "flowId": flowId,
            }
            await addTaskStatus(singleTaskLogDataPayload)
            dispatch(runningStatus(result.data))
        })
        closePopup(false)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.openExecuteModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.openExecuteModal}>
                    <Box sx={style}>
                        <CloseIcon onClick={handleClose} sx={{ cursor: "pointer", position: "absolute", top: "10px", right: "10px" }} />
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        {name}
                                    </Typography>
                                    {variableSel.length !== 0 && <ExecuteDatepicker selectedDate={selectedDate} handleDateChange={handleDateChange} />}
                                </Box>

                                <Divider />
                                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 3 }}>Tasks</Typography>
                                {tasks && tasks.map((task, index) => (
                                    <Typography key={index} sx={{ p: 1 }}>
                                        {task}
                                    </Typography>
                                ))}
                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                    <Button variant="contained" onClick={() => handleExecuteClick(flowId, name, props.OpenExecuteModal)} >Execute</Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
