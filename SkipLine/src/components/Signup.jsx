import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import './Signup.css'

const Signup = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {

      if (!name.trim()) {
        alert("Name cannot be empty");
        return;
      }
      if (name.trim().length < 3) {
        alert("Please enter a valid name");
        return;
      }

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

        const user = userCredential.user;

        await sendEmailVerification(user);

        await setDoc(doc(db, "users", user.uid), {
          name: name.trim(),
          email: emailLower,
          createdAt: new Date()
        });

        alert("Verification email sent. Please check your inbox.");

        navigate('/login')

      } catch (error) {
        console.error("Signup error:", error);
        alert(error.code + " : " + error.message);
      }
    };

    function handleBack(){
      navigate('/')
    }

  return (
    <div class="screen">
    <div class="card">
        <h2>Student Sign Up</h2>

        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>

        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

        <button class="login-btn" onClick={handleSignup}>Sign Up</button>

        <button class="back-btn" onClick={handleBack}>↩ Back</button>
        </div>
    </div>
  )
}

export default Signup
