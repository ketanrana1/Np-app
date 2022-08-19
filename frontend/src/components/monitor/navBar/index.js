import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import FlowList from '../flowList/FlowList';
import { useDispatch, useSelector } from 'react-redux';
import AccountsMenu from './accountMenu';
import {
    drawerWidth,
    LogoutText,
    AdminText,
    RefreshText,
    ClearLogs,
    fileExplorer,
} from '../../../utils/constent';
import {
    Box,
    styled,
    Zoom,
    useTheme,
    IconButton,
    MenuIcon,
    MuiDrawer,
    MuiAppBar,
    AdminPanelSettingsIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    Divider,
    DeleteOutlineIcon,
    List,
    ListItem,
    LogoutIcon,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Tooltip,
    Toolbar,
    Typography,
    RefreshIcon,
    FolderIcon,
} from '../../common/muiImports'
import { clearTaskActions, clearTaskLogs } from '../../../api/logs';
import { isLogClear } from '../../../redux/actions/logStatusAction';
import { Link } from 'react-router-dom';
import { REACT_APP_BACKEND_URL } from '../../common/environment';

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
}));


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        minHeight: '46px',
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const dispatch = useDispatch()
    const theme = useTheme();
    const navigate = useNavigate()
    const selector = useSelector((state) => state?.logsStatusChanged)
    const [open, setOpen] = useState(true);
    const [authRole, setauthRole] = useState(null)

    useEffect(() => setauthRole(sessionStorage.getItem('Role')), [])

    const handleLogout = () => {
        sessionStorage.setItem('Auth key', '');
        sessionStorage.setItem('Role', '');
        return [navigate("/login"), toast("Logout Successfully", { autoClose: 2000 })]
    }

    const getLogs = async () => {
        const { id, taskType, actionId, actionName } = selector?.logsStatus
        taskType ? await clearTaskLogs(id) : await clearTaskActions(actionName, actionId)
    }

    const handleRefreshData = async () => {
        await getLogs()
        dispatch(isLogClear(Math.random()))
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open} style={{ backgroundColor: '#fff', color: "#575757" }}>
                <Toolbar style={{ minHeight: "55px" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="subtitle1" noWrap component="div">
                        Np App
                    </Typography>
                    <AccountsMenu />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {authRole === 'admin' && <><List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => navigate('/connection')}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {!open ? <Tooltip TransitionComponent={Zoom} title="Configure View" placement="right"><AdminPanelSettingsIcon /></Tooltip> : <AdminPanelSettingsIcon />}
                            </ListItemIcon>
                            <ListItemText primary={AdminText} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
                    <Divider /></>}

                <FlowList open={open} />
                <Divider />

                <div style={{ position: "absolute", bottom: "10px",width:"100%" }}>
                    <List >
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 28,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <a href={`${REACT_APP_BACKEND_URL}/file-explorer/`} target="_blank" style={{ width:"100%",display: "flex" }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {!open ? <Tooltip TransitionComponent={Zoom} title="File Explorer" placement="right"><FolderIcon /></Tooltip> : <FolderIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={fileExplorer} sx={{ opacity: open ? 1 : 0 }} />
                                </a>
                            </ListItemButton>
                        </ListItem>
                    </List>


                    <List >
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 28,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => window.location.reload()}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {!open ? <Tooltip TransitionComponent={Zoom} title="Refresh Data" placement="right"><RefreshIcon /></Tooltip> : <RefreshIcon />}
                                </ListItemIcon>
                                <ListItemText primary={RefreshText} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <List >
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 28,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={handleRefreshData}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {!open ? <Tooltip TransitionComponent={Zoom} title="Clear Logs" placement="right"><DeleteOutlineIcon /></Tooltip> : <DeleteOutlineIcon />}
                                </ListItemIcon>
                                <ListItemText primary={ClearLogs} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <List >
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 28,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={handleLogout}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {!open ? <Tooltip TransitionComponent={Zoom} title="Logout" placement="right"><LogoutIcon /></Tooltip> : <LogoutIcon />}
                                </ListItemIcon>
                                <ListItemText primary={LogoutText} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </Box>
    );
}
