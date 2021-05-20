import React from "react";
import "./SignupForm.css";

const SignupForm = () => {
  return (
    <form className="form">
      SIGN UP
      <div className="input-group">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Password" />
      </div>
      <div className="submit">
        <button>SIGN UP</button>
      </div>
    </form>
  );
};

export default SignupForm;
