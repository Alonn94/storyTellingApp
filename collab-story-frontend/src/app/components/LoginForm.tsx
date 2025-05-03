import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice"; 
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://collab-story-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Login failed");
      }

      const { accessToken } = await res.json();

      const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
      const userId = tokenPayload.userId;

      dispatch(setUser({ id: userId, username: null, email, token: accessToken }));
      navigate("/");

    } catch (err: any) {
      setError(err.message || "An error occurred.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};


export default LoginForm;