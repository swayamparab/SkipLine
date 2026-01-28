import React from 'react'
import './Signup.css'

const Signup = (props) => {

    
    function handleClick(){
        props.setScreen("home")
    }

  return (
    <div class="screen">
    <div class="card">
        <h2>Student Sign Up</h2>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Phone Number" />
        <input type="password" placeholder="Password" />

        <button class="login-btn">Sign Up</button>

        <button class="back-btn" onClick={handleClick}>↩ Back</button>
        </div>
    </div>
  )
}

export default Signup
