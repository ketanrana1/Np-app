import React, { useState } from 'react'
import firebaseConfig from "../firebase-config"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import Loader from "../components/field/loader"
import { roles } from '../utils/constent'
const DEFAULT_STATE = {
  email: '',
  password: '',
}

const Register = () => {

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)
  const [formState, setFormState] = useState(DEFAULT_STATE);

  const registerButtonHandler = async () => {
    setLoader(true)
    const { email, password, role } = formState

    if (!role) return [toast("Please Select User Role", { autoClose: 2000 }), setLoader(false)]

    try {
      const { user } = await createUserWithEmailAndPassword(getAuth(firebaseConfig), email, password);
                       await updateProfile(user, { displayName: role, });

      return [setLoader(false), toast("User Registered Successfully", { autoClose: 2000 }), setFormState(DEFAULT_STATE)];
    } catch (error) {
      return [setLoader(false),toast(error?.message, { autoClose: 2000 })];
    }
  }

  const onInputChangeHandler = (e) => setFormState({ ...formState, [e.target.name]: e.target.value })

  return (
    <>
      <div className="col-12">
        <h1 className="page-head">Register</h1>
        <div className="inner-body-cont">
          <div className="row w-100">
            <div className="col-md-6">
              <div className="common-input-field-wrapper input-wrapper">
                <label>Email</label>
                <input type="email" name="email" className="form-control" placeholder="Email" required onChange={onInputChangeHandler} value={formState.email} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="common-input-field-wrapper input-wrapper">
                <label>Password</label>
                <input type="password" name="password" className="form-control" placeholder="Password" required onChange={onInputChangeHandler} value={formState.password} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="common-input-field-wrapper select-box-wrapper">
                <label>Role</label>
                <select onChange={onInputChangeHandler} name="role" className="form-control">
                  {roles.map((role) => <option value={role.value}>{role.label}</option>)}
                </select>
              </div>
            </div>
            <div className="col-md-12">
                <input className="register-submit" type="submit" value="Register" onClick={registerButtonHandler} />
            </div>
          </div>
        </div>
      </div>
      {loader && <Loader />}
    </>
  )
}


export default Register