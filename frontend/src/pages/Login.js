import React, { useState } from 'react'
import firebaseConfig from "../firebase-config"
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import "../assets/css/global.css"
const DEFAULT_STATE = {
  email: '',
  password: ''
}

const Login = () => {

  const navigate = useNavigate();

  const [formState, setFormState] = useState(DEFAULT_STATE);
  const [loader, setLoader] = useState(false)
  const loginButtonHandler = async () => {
    const { email, password } = formState
    setLoader(true)
    try {
      const response = await signInWithEmailAndPassword(getAuth(firebaseConfig), email, password);
      sessionStorage.setItem('Auth key', response._tokenResponse.refreshToken);

      setLoader(false)
      navigate('/connection')
      return toast("Logged in Successfully")

    } catch (error) {
      return toast(error?.message);
    }
  }

  const forgotPasswordHandler = async () => {
    const { email } = formState
    try {
      await sendPasswordResetEmail(getAuth(firebaseConfig), email)
      return toast("Reset Password email has been sent successfully")
    } catch (error) {
      return toast(error?.message);
    }
  }

  const onInputChangeHandler = (e) => setFormState({ ...formState, [e.target.name]: e.target.value })

  return (
    <>

      <div className="login-form-cont">

        <h3 className="logo-text">Logo</h3>
        <div className="form-group">
          <input type="email" name="email" className="form-control" placeholder="Email" required onChange={onInputChangeHandler} />
        </div>
        <div className="form-group">
          <input type="password" name="password" className="form-control" placeholder="Password" required onChange={onInputChangeHandler} />
        </div>
        <div className="form-group frgt-pssw-cont">
          <Link to="/login"><div onClick={forgotPasswordHandler}>Forgot Password</div></Link>
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label" for="exampleCheck1">Remember</label>
        </div>
        <div className="submit-cont">
          <div className='backgorund btn btn-primary' onClick={!loader && loginButtonHandler} >
            {loader ? <div className='loader'></div> : <div className='py-2 px-4'>Login</div>}
          </div>
        </div>
      </div>
    </>
  )
}


export default Login