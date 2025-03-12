import React, { useState } from "react";
import "./Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillGoogleCircle, AiFillFacebook, AiFillApple } from "react-icons/ai";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase"; // Import Firestore
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Google Sign-In (only if user exists in Firestore)
  const handleGoogleSignIn = async () => {
    try {
      // Get user email from Google provider
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        navigate("/"); // Allow sign-in and redirect
      } else {
        setError("Google Sign-In is restricted. Please sign up first.");
        await auth.signOut(); // Sign out user if they didn't sign up
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="icon-container">
          <img src="https://cdn-icons-png.flaticon.com/512/786/786408.png" alt="Login Icon" width="50" />
        </div>
        <h2>Sign in with email</h2>
        <p>Make a new doc to bring your words, data, and teams together. For free</p>

        {error && <p className="error-message">{error}</p>}

        {/* Email Input */}
        <div className="input-group">
          <i><FaEnvelope /></i> 
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <i><FaLock /></i>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Forgot Password */}
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>

        {/* Login Button */}
        <button className="login-btn" onClick={handleLogin}>Get Started</button>

        {/* OR Text */}
        <div className="or-text">Or sign in with</div>

        {/* Social Login Buttons */}
        <div className="social-login">
          <button onClick={handleGoogleSignIn}><AiFillGoogleCircle size={28} color="#EA4335" /></button>
          <button><AiFillFacebook size={28} color="#1877F2" /></button>
          <button><AiFillApple size={28} color="black" /></button>
        </div>
      </div>
    </div>
  );
};

export default Login;
