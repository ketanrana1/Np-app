import React, { useState } from 'react'
import firebaseConfig from "../firebase-config"
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import "../assets/css/global.css"
import jwt from 'jsonwebtoken'
import { REACT_APP_JWT_SECRET_KEY } from '../components/common/environment';


const jwtKey = REACT_APP_JWT_SECRET_KEY
const jwtExpirySeconds = 86400

const DEFAULT_STATE = {
  email: '',
  password: ''
}

const Login = () => {

  const navigate = useNavigate();

  const [formState, setFormState] = useState(DEFAULT_STATE);
  const [changePassword, setChangePassword] = useState(false)
  const [loader, setLoader] = useState(false)
  const loginButtonHandler = async () => {
    const { email, password } = formState
    setLoader(true)
    try {
      const response = await signInWithEmailAndPassword(getAuth(firebaseConfig), email, password);

      const responseToken = response._tokenResponse.refreshToken;    
      const token = jwt.sign({ responseToken, email }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
      })
      sessionStorage.setItem('AccessToken', token);
      localStorage.setItem('AccessToken', token);
      
      sessionStorage.setItem('Auth key', responseToken);
      localStorage.setItem('AccessToken', token);

      setLoader(false)
      navigate('/connection')
      return toast("Logged in Successfully", { autoClose: 2000 })

    } catch (error) {
      setLoader(false)
      return toast(error?.message, { autoClose: 2000 });
    }
  }

  const forgotPasswordHandler = async () => {
    setChangePassword(true)
    setFormState(DEFAULT_STATE)
  }
  const sendEmail = async () => {
    setLoader(true)
    const { email } = formState
    try {
      await sendPasswordResetEmail(getAuth(firebaseConfig), email)
      setLoader(false)
      toast("Reset Password email has been sent successfully", { autoClose: 2000 })
      setTimeout(() => {
        setChangePassword(false)
      }, 1000)
      return
    } catch (error) {
      return [setLoader(false), toast("Please Fill the Email Field", { autoClose: 2000 })];
    }
  }
  const onInputChangeHandler = (e) => setFormState({ ...formState, [e.target.name]: e.target.value })

  return (
    <>
      <div className="login-form-cont">
        <h3 className="logo-text">{changePassword ? 'Forget Password' : 'Logo'}</h3>
        <div className="form-group">
          <input type="email" name="email" className="form-control" placeholder="Email" required onChange={onInputChangeHandler} value={formState.email} />
        </div>
        {!changePassword && <><div className="form-group">
          <input type="password" name="password" className="form-control" placeholder="Password" required onChange={onInputChangeHandler} value={formState.password} />
        </div>
          <div className="form-group frgt-pssw-cont">
            <Link to="/login"><div onClick={forgotPasswordHandler}>Forgot Password</div></Link>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label" for="exampleCheck1">Remember</label>
          </div></>}

        <div className="submit-cont">
          {changePassword ?
            (<div className='d-flex justify-content-between w-100'>
              <div className='py-2 px-4 btn btn-primary' onClick={() => setChangePassword(false)}>Go Back</div>
              <div className='py-2 px-4 btn btn-primary' onClick={sendEmail}>{loader ?
                  <div className='loader'></div> : "Send Email"}</div>
              </div>) : (
              <div className='backgorund btn btn-primary' onClick={!loader && loginButtonHandler}>
                {loader ?
                  <div className='loader'></div> : <div className='btn btn-primary py-2 px-4' >Login</div>}
            </div>)
          }
        </div>
      </div>
    </>
  )
}


export default Login