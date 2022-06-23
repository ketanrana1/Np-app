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
    
    } catch (error) {
      return toast(error?.message);  
    }
  }

  const onInputChangeHandler = (e) => setFormState({...formState , [e.target.name]: e.target.value})

  return (
    <div className="col-12">
      <h1 className="page-head">Register</h1>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" className="form-control" placeholder="Email" required onChange={onInputChangeHandler}/>
      </div>
      <div className="form-group">
      <label>Email</label>
        <input type="password" name="password" className="form-control" placeholder="Password" required onChange={onInputChangeHandler}/>
      </div>
      <div className='mt-5'>
         <input type="submit" value="Register" className='btn btn-primary' onClick={registerButtonHandler}/>
      </div>
    </div>
    )  
}


export default Register