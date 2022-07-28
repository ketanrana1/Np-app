import { REACT_APP_BACKEND_URL } from '../../components/common/environment';
import { toast, Bounce } from 'react-toastify';

export const roles = [
    { value: '', label: 'Please Select Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
]
export const DEFAULT_ERROR_NOTIFICATION = 'Something gone wrong!';

export const TOASTR_OPTIONS = {                                                           // CUSTUM TOSTIFY 
    position: toast.POSITION.TOP_RIGHT,
    transition: Bounce,
    // theme: 'colored',
};

export const drawerWidth = 310;                                                            // NAV SIDE BAR WIDTH ON ACTIVE STATE
export const LogoutText = "Logout"
export const AdminText = "Configure View"
export const RefreshText = "Refresh Data"
export const ClearText = "Clear Logs"

