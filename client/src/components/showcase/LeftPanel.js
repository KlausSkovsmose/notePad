import React from "react";
import SignupForm from "./SignupForm";

const LeftPanel = () => {
  return (
    <div>
      <SignupForm />
      <div style={{ width: "25rem", marginTop: "5rem" }}>
        <h3>Your notes SHOULD be secure !</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc risus
          tortor, tincidunt non laoreet sit amet, sollicitudin quis tortor.
          Donec posuere auctor risus, vitae accumsan augue. Quisque sagittis
          eros non justo semper porttitor. Maecenas id magna in ipsum lacinia
          sodales.
        </p>
      </div>
    </div>
  );
};

export default LeftPanel;
