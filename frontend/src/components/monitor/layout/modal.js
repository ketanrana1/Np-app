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

    const handleExecuteClick = async (id, name, closePopup) => {

        try {
            /* */
            const currentTime = new Date().toLocaleString()
            const paylaod = {
                "ranAt": currentTime,
                "startTime": currentTime,
                "flowName": name,
                "flowId": id,
                "endTime": "",
                "status": "In progress"
            }
            const logData = await axios({
            method: 'get',
            url: `https://jsonplaceholder.typicode.com/posts/1`,
            headers: {
                'Authorization': `${sessionStorage.getItem('AccessToken')}`
            }
            });
            const result = await axios({
                method: 'post',
                url: `${REACT_APP_BACKEND_URL}/api/add-run-status`,
                headers: {
                    'Authorization': `${sessionStorage.getItem('AccessToken')}`
                },
                data: paylaod 
            });
            /* */

            /* */
            const singleFlowDetails = await axios({
                method: 'get',
                url: `${REACT_APP_BACKEND_URL}/api/get-flow/${id}`,
                headers: {
                    'Authorization': `${sessionStorage.getItem('AccessToken')}`
                },
                data: paylaod
            });
            dispatch(runningStatus(logData.data))
            const tasks = singleFlowDetails.data[0].tasks
            tasks.map( async (task, index) => {

                const singleTasKLogData = await axios({
                    method: 'get',
                    url: `https://jsonplaceholder.typicode.com/posts/100`,
                    headers: {
                        'Authorization': `${sessionStorage.getItem('AccessToken')}`
                    }
                });

                const actionsData = await axios({
                    method: 'get',
                    url: `https://jsonplaceholder.typicode.com/posts/${index + 2}`,
                    headers: {
                        'Authorization': `${sessionStorage.getItem('AccessToken')}`
                    }
                });

                const actionDetails = [ 
                    { "actionName" : actionsData.data.title , "logDate": currentTime, "logDescription": actionsData.data.body, "isLogDeleted": false},
                    { "actionName" : actionsData.data.id , "logDate": currentTime, "logDescription": actionsData.data.body, "isLogDeleted": false},
                    { "actionName" : actionsData.data.userId , "logDate": currentTime, "logDescription": actionsData.data.body, "isLogDeleted": false}
                ]
                const singleTasKLogDataPayload = {
                    "taskLog": singleTasKLogData.data.body,
                    "taskName": task,
                    "ranAt": currentTime,
                    "startTime": currentTime,
                    "endTime": "",
                    "status": "In progress",
                    "actions": actionDetails 
                }

                const singleTasKStatusData = await axios({
                    method: 'post',
                    url: `${REACT_APP_BACKEND_URL}/api/add-task-status`,
                    headers: {
                        'Authorization': `${sessionStorage.getItem('AccessToken')}`
                    }, 
                    data: singleTasKLogDataPayload
                });
            })
            closePopup(false) 
            toast("Flow is executed", { autoClose: 2000 })
            /* */
            
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
