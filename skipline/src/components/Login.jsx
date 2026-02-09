import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }
        
        try {
            const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
            );

            const user = userCredential.user;

            await user.reload();

            if (!user.emailVerified) {
            alert("Please verify your email before logging in.");
            return;
            }

            navigate('/dashboard');

        } catch (error) {
            alert(error.message);
        }
    };


    const handleBack = ()=>{
        navigate('/')
    }

    const handleForgotPassword = async () => {
    if (!email) {
        alert("Please enter your email first");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent. Check your inbox.");
    } catch (err) {
        if (err.code === "auth/user-not-found") {
            alert("No account found with this email");
        } else {
            alert("Failed to send reset email");
        }
    }
    };

  return (
        <div className="screen">
            <div className="card">
            <h2>Student Login</h2>

            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

            <button className="login-btn" onClick={handleLogin}>Log in</button>

            <div className="lowerBtns">
                <button className="back-btn" onClick={handleBack}>↩ Back</button>
                <button className="back-btn" onClick={handleForgotPassword}>forgot password?</button>
            </div>
            </div>
        </div>
  )
}

export default Login
