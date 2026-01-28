import React from 'react'
import './Landingpage.css'

const Landingpage = (props) => {
  return (
      <div className="screen">
      <div className="card">

        <img
          src="../public/Logo.png"
          alt="SkipLineAI"
          style={{ width: "80px", marginBottom: "16px" }}
        />

        <h2>Smart Canteen Queue System</h2>

        <button
          className="login-btn"
          onClick={() => props.setScreen("login")}
        >
          Log in
        </button>

        <button
          className="login-btn"
          style={{ background: "#7f8c8d" }}
          onClick={() => props.setScreen("signup")}
        >
          Sign Up
        </button>

      </div>
    </div>
  )
}

export default Landingpage
