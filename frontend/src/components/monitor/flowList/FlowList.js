import React, { useEffect, useState } from 'react';
import { REACT_APP_BACKEND_URL } from '../../../components/common/environment';
import Loader from '../../../components/field/loader';
import ExecuteModal from '../layout/modal';
import { useDispatch } from 'react-redux';
import { flowLists } from '../../../redux/actions/flowListAction';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LayersIcon,
  ListItemButton,
  Tooltip,
  Zoom,
} from '../../common/muiImports'
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
  const useStyles = makeStyles((theme) => ({
    root: {
      "&::-webkit-scrollbar": {
        width: `8px`,
        backgroundColor: `#F5F5F5`,
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.1)`,
        backgroundColor: `#ffff`,
        borderRadius: `8px`,
      },

      "&::-webkit-scrollbar-thumb": {
        backgroundImage: `-webkit-linear-gradient(90deg,
      rgb(255, 255, 255) 0%,
      rgb(212, 212, 212) 25%,
      transparent 100%,
      rgb(194, 194, 194) 75%,
      transparent)`,
        borderRadius: `10px`,
      },
    },

  }));
  const classes = useStyles();
  return (
    <>
      <List className={classes.root} sx={{ maxHeight: "60vh", overflowY: "scroll" }}>
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