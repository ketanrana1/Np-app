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
  const [loader, setLoader] = useState(false)
  const [formState, setFormState] = useState(DEFAULT_STATE);

  const registerButtonHandler = async () => {
    setLoader(true)
    const { email, password } = formState
    try {
      await createUserWithEmailAndPassword(getAuth(firebaseConfig), email, password);
      setLoader(false)
      toast("User Registered Successfully", { autoClose: 2000 })
      setFormState(DEFAULT_STATE)
      return;
    } catch (error) {
      setLoader(false)
      return toast(error?.message, { autoClose: 2000 });
    }
  }

  const onInputChangeHandler = (e) => setFormState({ ...formState, [e.target.name]: e.target.value })

  return (
    <>
      <div className="col-12">
        <h1 className="page-head">Register</h1>
        <div className="inner-body-cont">
        <div className="form-group mt-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" placeholder="Email" required onChange={onInputChangeHandler} value={formState.email} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" placeholder="Password" required onChange={onInputChangeHandler} value={formState.password} />
        </div>
        <div className='mt-5'>
          <input className="register-submit" type="submit" value="Register" onClick={registerButtonHandler} />
        </div>
        </div>   
      </div>
      {loader && <Loader />}
    </>
  )
}


export default Register