import React, { useEffect, useState } from 'react';
import { REACT_APP_BACKEND_URL } from '../../../components/common/environment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LayersIcon from '@mui/icons-material/Layers';
import axios from 'axios';
import Loader from '../../../components/field/loader';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import ExecuteModal from '../layout/modal';
import { useDispatch } from 'react-redux';
import { flowLists } from '../../../redux/actions/flowListAction';

const FlowList = ({ open }) => {
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [flowList, setFlowList] = useState()
  const [openExecuteModal, OpenExecuteModal] = useState(false);
  const [flowName, setFlowName] = useState();

  useEffect(() => {
    setLoader(true)
    const getFlow = async () => {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${REACT_APP_BACKEND_URL}/api/get-flow`,
          headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
          }
        });

        return [dispatch(flowLists(data[0])), setLoader(false), setFlowList(data)]
      } catch (error) {
        return [setLoader(false), console.log(error)]
      }
    }
    getFlow()
  }, [])

  const handleFlowList = (name) => {
    const filteredFlowList = flowList?.find((list) => { return list.name === name })

    setFlowName(filteredFlowList)
    OpenExecuteModal(!openExecuteModal)
  }

  return (
    <>
      <List>
        {flowList?.map((text, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Tooltip TransitionComponent={Zoom} title={text.name} placement="right">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleFlowList(text.name)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
        {loader && <Loader />}
      </List>
      {openExecuteModal && <ExecuteModal
        openExecuteModal={openExecuteModal}
        OpenExecuteModal={OpenExecuteModal}
        flowName={flowName}
      />}
    </>

  )
}

export default FlowList