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