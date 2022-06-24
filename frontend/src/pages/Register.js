import React, { useState } from 'react'
import firebaseConfig from "../firebase-config"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import Loader from "../components/field/loader"
const DEFAULT_STATE = {
  email: '',
  password: ''
}

const Register = () => {

  const navigate = useNavigate();
  const [loader, useLoader] = useState(false)
  const [formState, setFormState] = useState(DEFAULT_STATE);

  const registerButtonHandler = async () => {
    const { email, password } = formState
    try {
      await createUserWithEmailAndPassword(getAuth(firebaseConfig), email, password);
      toast("User Registered Successfully")
      setFormState(DEFAULT_STATE)
      return;
    } catch (error) {
      return toast(error?.message);
    }
  }

  const onInputChangeHandler = (e) => setFormState({ ...formState, [e.target.name]: e.target.value })

  return (
    <>
      <div className="col-12">
        <h1 className="page-head">Register</h1>
        <div className="form-group mt-5">
          <label>Email</label>
          <input type="email" name="email" className="form-control" placeholder="Email" required onChange={onInputChangeHandler} value={formState.email} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" placeholder="Password" required onChange={onInputChangeHandler} value={formState.password} />
        </div>
        <div className='mt-5'>
          <input type="submit" value="Register" className='btn btn-primary' onClick={registerButtonHandler} />
        </div>
      </div>
      {loader && <Loader />}
    </>
  )
}


export default Register