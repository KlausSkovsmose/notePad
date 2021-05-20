import React from "react";
import { Redirect } from "react-router";
import { useUser } from "../../context/user.context";

const Dashboard = () => {
  const { userData } = useUser();

  if (!userData) return <Redirect to="/" />;

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
};

export default Dashboard;
