import React from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import "./index.css";

const Showcase = () => {
  return (
    <div className="showcase">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default Showcase;
