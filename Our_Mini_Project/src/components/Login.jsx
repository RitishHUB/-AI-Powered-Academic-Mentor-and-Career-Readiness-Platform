import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import sampleImg from "../assets/classroom1.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ " + data.message);
        setIsError(false);

        // Save token + user in localStorage
        localStorage.setItem("learnxToken", data.token);
        localStorage.setItem("learnxUser", JSON.stringify(data.user));

        // Navigate after success
        setTimeout(() => navigate("/main"), 2000);
      } else {
        setMessage("❌ " + data.message);
        setIsError(true);
      }
    } catch (err) {
      setMessage("❌ Server not responding");
      setIsError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={sampleImg} alt="classroom" />
        <div className="login-img-text">
          <h2>Learnx is simply</h2>
          <p>The Way To Next-Step</p>
        </div>
      </div>

      <div className="login-form">
        <h3>Welcome to Learnixx..!</h3>
        <div className="toggle-btns">
          <button type="button" className="active">Login</button>
          <button type="button" onClick={() => navigate("/signup")}>Register</button>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">Login</button>
        </form>

        {message && (
          <p style={{ color: isError ? "red" : "green", marginTop: "10px" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
