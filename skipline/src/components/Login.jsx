import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Login.css'

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        if (!email || !password) {
            toast.error("Please enter email and password");
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
            toast.warning("Please verify your email before logging in.");
            return;
            }

            toast.success("Login Successful!")
            navigate('/dashboard');

        } catch (error) {
            toast.error(error.message);
        }
    };


    const handleBack = ()=>{
        navigate('/')
    }

    const handleForgotPassword = async () => {
    if (!email) {
        toast.error("Please enter your email first");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset email sent. Check your inbox.");
    } catch (err) {
        if (err.code === "auth/user-not-found") {
            toast.error("No account found with this email");
        } else {
            toast.error("Failed to send reset email");
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
