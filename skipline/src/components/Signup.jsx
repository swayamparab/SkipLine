import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import './Signup.css'

const Signup = ({setScreen}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {

      const emailLower = email.toLowerCase();
      if (!emailLower.endsWith("@student.sfit.ac.in")) {
        alert("Use college email id only");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailLower,
          password
        );

        await sendEmailVerification(userCredential.user);

        alert("Verification email sent. Please check your inbox.");

        setScreen("login");

      } catch (error) {
        alert(error.message);
      }
    };

    function handleBack(){
      setScreen("landingpage")
    }

  return (
    <div class="screen">
    <div class="card">
        <h2>Student Sign Up</h2>

        {/* <input type="text" placeholder="Full Name" /> */}
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        {/* <input type="tel" placeholder="Phone Number" /> */}
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

        <button class="login-btn" onClick={handleSignup}>Sign Up</button>

        <button class="back-btn" onClick={handleBack}>↩ Back</button>
        </div>
    </div>
  )
}

export default Signup
