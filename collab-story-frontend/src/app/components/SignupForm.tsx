import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";

const SignupForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://collab-story-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      alert(data.message); //"User registered successfully"

      const loginResponse = await fetch("https://collab-story-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
        credentials: "include",
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        dispatch(setUser({ ...loginData.user, token: loginData.accessToken }));
      } else {
        alert("Signup succeeded but login failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default SignupForm;