import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usernameDocRef = doc(db, "usernames", userName.toLowerCase());
      const usernameDocSnap = await getDoc(usernameDocRef);
  
      if (usernameDocSnap.exists()) {
        setError("Username already exists. Please choose another one.");
        return;
      }
  
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", user.uid), {
        userName: userName,
        savedPets: [],
        cartItems: [],
      });
      await setDoc(usernameDocRef, { uid: user.uid });
      navigate('/blog');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sign-up">
      <p>Sign up today!</p>
      <div className="signin-form">
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
