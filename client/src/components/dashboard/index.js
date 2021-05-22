import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useUser } from "../../context/user.context";
import axios from "axios";

const Dashboard = () => {
  const { userData } = useUser();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (userData) {
      axios
        .get(`http://localhost:5000/${userData.username}/notes/`)
        .then((data) => setNotes(data))
        .catch((error) => console.log(error.response));
    }
  });

  if (!userData) return <Redirect to="/" />;

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
};

export default Dashboard;
