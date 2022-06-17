import React, { useState } from 'react'
import firebaseConfig from "../firebase-config"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const DEFAULT_STATE = {
  email: '',
  password: ''
}

const Login = () => {

  const [formState, setFormState] = useState(DEFAULT_STATE);

  const loginButtonHandler = async () => {
    const { email, password } = formState
    try {
      const response = await signInWithEmailAndPassword(getAuth(firebaseConfig),email, password); 
      console.log("response", response.data)
    } catch (error) {
      console.log("error", error?.message)
    }
  }

  const onInputChangeHandler = (e) => setFormState({...formState , [e.target.name]: e.target.value})

  return (
    <div className="login-form-cont">
        <h3 className="logo-text">Logo</h3>
      <div className="form-group">
        <input type="email" name="email" className="form-control" placeholder="Email" required onChange={onInputChangeHandler}/>
      </div>
      <div className="form-group">
        <input type="password" name="password" className="form-control" placeholder="Password" required onChange={onInputChangeHandler}/>
      </div>
      <div className="form-group frgt-pssw-cont">
        <a href="">Forgot Password</a>
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" />
        <label className="form-check-label" for="exampleCheck1">Remember</label>
      </div>
      <div className="submit-cont">
         <input type="submit" value="Login" onClick={loginButtonHandler}/>
      </div>
    </div>
    )  
}


export default Login