import { REACT_APP_BACKEND_URL } from '../../components/common/environment';
import { toast, Bounce } from 'react-toastify';

export const roles = [
    { value: '', label: 'Please Select Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
]
export const DEFAULT_ERROR_NOTIFICATION = 'Something gone wrong!';

export const TOASTR_OPTIONS = {
    position: toast.POSITION.BOTTOM_RIGHT,
    transition: Bounce,
    theme: 'colored',
};

export const drawerWidth = 310;
export const LogoutText = "Logout"
export const AdminText = "Configure View"
export const RefreshText = "Refresh Data"
export const ClearText = "Clear Logs"

export const CLEAR_LOG_TASK = `${REACT_APP_BACKEND_URL}/api/edit-task-log-status`          // CLEAR LOGS OF TASK
export const CLEAR_LOG_ACTION = `${REACT_APP_BACKEND_URL}/api/edit-action-log-status`      // CLEAR LOGS OF ACTION