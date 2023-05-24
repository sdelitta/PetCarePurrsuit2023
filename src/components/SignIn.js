// components/SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import SignUp from "./SignUp";


import '../CSS/SignIn.css'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);
      const userDocRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(userDocRef);
      if (!docSnapshot.exists()) {
        await setDoc(userDocRef, {
          savedPets: []
        });
        console.log("User document created successfully.");
      } else {
        console.log("User document already exists.");
      }
      navigate('/blog');
    } catch (err) {
      setError(err.message);
      console.error('Error signing in:', err);
    }
  };
  

  return (
    <div className='signin'>
      <p>Sign In</p>
      <div className="signin-form">
        <form onSubmit={handleSubmit}>
        
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
      {error && <p>{error}</p>}
      <p style={{fontSize: "35px", marginTop: "15px"}}>- Not a member? -</p>
      <SignUp />
    </div>
  );
};

export default SignIn;
