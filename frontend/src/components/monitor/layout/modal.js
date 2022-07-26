import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { REACT_APP_BACKEND_URL } from '../../common/environment';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../../components/field/loader';
import { useDispatch } from 'react-redux';
import { runningStatus } from '../../../redux/actions/runningStatusAction';
import { getFlow } from '../../../api/getFlow';
import { runStatus } from '../../../api/runStatus';
import { addLogs } from '../../../api/addLog';
import { thirdParty } from '../../../api/thirdParty';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    minHeight: '400px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};

export default function ExecuteModal(props) {
    const dispatch = useDispatch()
    const { name, flowId } = props?.flowName
    const [loader, setLoader] = useState(false)
    const handleClose = () => props.OpenExecuteModal(false);
    const [logs, setLogs] = useState()


    const handleExecuteClick = async (id, name, closePopup) => {

        try {
            const currentTime = new Date().toLocaleString()
            const paylaod = {
                "ranAt": currentTime,
                "startTime": currentTime,
                "flowName": name,
                "flowId": id,
                "endTime": "",
                "status": "In progress"
            }
            const response = await thirdParty()
            setLogs(response.body)
            try {
                const payload = {
                    "description": response.body,
                    "flowId": id,
                    "logDate": currentTime,
                }
                const responce = await addLogs(payload)
                setLogs(responce)
            } catch (error) {
                setLoader(false)
                console.log(error)
            }
            try {
                await runStatus(paylaod)
                await getFlow(id)
                dispatch(runningStatus(response))
                props.OpenExecuteModal(false)
            } catch (error) {
                toast(error?.message, { autoClose: 2000 })
            }

        } catch (error) {
            setLoader(false)
            console.log(error)
        }
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
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            FLow Name: {name}
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <Button variant="contained" onClick={() => handleExecuteClick(flowId, name, props.OpenExecuteModal)} >Execute</Button>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
            {loader && <Loader />}
        </div>
    );
}
