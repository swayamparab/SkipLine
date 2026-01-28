import React from 'react'
import './Login.css'

const Login = (props) => {

    function handleClick(){
        props.setScreen("home")
    }

  return (
        <div class="screen">
            <div class="card">
            <h2>Student Login</h2>

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button class="login-btn">Log in</button>

            <button class="back-btn" onClick={handleClick}>↩ Back</button>
            </div>
        </div>
  )
}

export default Login
