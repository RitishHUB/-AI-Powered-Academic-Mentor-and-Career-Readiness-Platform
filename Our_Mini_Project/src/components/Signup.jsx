import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import sampleImg from "../assets/classroom1.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ " + data.message);
        setIsError(false);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("❌ " + data.message);
        setIsError(true);
      }
    } catch {
      setMessage("❌ Server not responding");
      setIsError(true);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={sampleImg} alt="classroom" />
        <div className="signup-img-text">
          <h2>Learnixx is simply</h2>
          <p>The Way To Next-Step</p>
        </div>
      </div>

      <div className="signup-form">
        <h3>Create your account</h3>
        <div className="toggle-btns">
          <button type="button" onClick={() => navigate("/login")}>Login</button>
          <button type="button" className="active">Register</button>
        </div>

        <form onSubmit={handleSignup}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="submit-btn">Register</button>
        </form>

        {message && (
          <p style={{ color: isError ? "red" : "green", marginTop: "10px" }}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
