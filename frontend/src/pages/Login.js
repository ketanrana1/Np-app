import React from 'react'

const Login = () => {
  return (
    <div className="login-form-cont">
      <form>
        <h3 className="logo-text">Logo</h3>
      <div className="form-group">
        <input type="email" className="form-control" placeholder="Usernam/Email"/>
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Password" />
      </div>
      <div className="form-group frgt-pssw-cont">
        <a href="">Forgot Password</a>
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" />
        <label className="form-check-label" for="exampleCheck1">Remember</label>
      </div>
      <div className="submit-cont">
         <input type="submit" value="Login" />
      </div>
    </form>
    </div>
    )  
}


export default Login