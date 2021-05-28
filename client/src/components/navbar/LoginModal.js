import React, { useEffect, useState } from "react";
import "./LoginModal.css";
import axios from "axios";
import { useHistory } from "react-router";
import { useUser } from "../../context/user.context";

const LoginModal = ({ show, close }) => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const { setUserData } = useUser();
  let history = useHistory();

  const handleChange = (e) => {
    setUser((curUser) => {
      return { ...curUser, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `http://` + window.location.hostname + `:5000/login`,
        user
      );

      setUserData(data);
      localStorage.setItem("user", JSON.stringify(data));
      close();
      history.push("/dashboard");
    } catch (error) {
      console.log(error.response);
    }
  };

  const onEscape = (e) => (e.key === "Escape" && show ? close() : "");

  useEffect(() => {
    document.addEventListener("keydown", onEscape);

    return () => document.removeEventListener("keydown", onEscape);
  });

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={() => close()}>
            &times;
          </span>
          <h2>LOG IN</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={user.username}
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
              <button type="submit">Log In</button>
            </div>
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default LoginModal;
