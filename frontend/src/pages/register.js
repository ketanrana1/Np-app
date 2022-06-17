import React, { useState } from 'react'
import firebaseConfig from "../firebase-config"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const DEFAULT_STATE = {
  email: '',
  password: ''
}

const Register = () => {

  const navigate = useNavigate();

  const [formState, setFormState] = useState(DEFAULT_STATE);

  const registerButtonHandler = async () => {
    const { email, password } = formState
    try {
      await createUserWithEmailAndPassword(getAuth(firebaseConfig),email, password); 
      toast("User Registered Successfully")
      return navigate('/login')
    } catch (error) {
      return toast(error?.message);  
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
      <div className="submit-cont">
         <input type="submit" value="Register" onClick={registerButtonHandler}/>
      </div>
    </div>
    )  
}


export default Register