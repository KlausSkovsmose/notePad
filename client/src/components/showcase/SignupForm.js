import React, { useState } from "react";
import "./SignupForm.css";
import axios from "axios";

const SignupForm = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser((curUser) => {
      return { ...curUser, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/register", user);

      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      SIGN UP
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <div className="submit">
        <button type="submit">SIGN UP</button>
      </div>
    </form>
  );
};

export default SignupForm;
