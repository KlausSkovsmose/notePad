import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useUser } from "../../context/user.context";
import axios from "axios";
import NotesList from "./NotesList";

const Dashboard = () => {
  const { userData } = useUser();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (userData) {
      axios
        .get(`http://localhost:5000/${userData.username}/notes/`)
        .then((response) => setNotes(response.data))
        .catch((error) => console.log(error.response));
    }
  }, [userData]);

  if (!userData) return <Redirect to="/" />;

  return (
    <div>
      {" "}
      <NotesList notes={notes} />{" "}
    </div>
  );
};

export default Dashboard;
