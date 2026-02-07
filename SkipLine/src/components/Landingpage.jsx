import React from 'react'
import { useNavigate } from "react-router-dom";
import './Landingpage.css'

const Landingpage = () => {

  const navigate = useNavigate();

  return (
      <div className="screen">
      <div className="card">

        <img
          src='/Logo.png'
          alt="SkipLineAI"
          style={{ width: "80px", marginBottom: "16px" }}
        />

        <h2>Smart Canteen Queue System</h2>

        <button
          className="login-btn"
          onClick={() => navigate('/login')}
        >
          Log in
        </button>

        <button
          className="login-btn"
          style={{ background: "#7f8c8d" }}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>

      </div>
    </div>
  )
}

export default Landingpage
