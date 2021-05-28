import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useUser } from "../../context/user.context";
import axios from "axios";
import NotesList from "./NotesList";
import AddNoteModal from "./AddNoteModal";
import "./index.css";

const Dashboard = () => {
  const { userData } = useUser();
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal((c) => !c);
  };

  const handleSubmit = async (e, note) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `http://` +
          window.location.hostname +
          `:5000/${userData.username}/notes/`,
        {
          token: userData.token,
          title: note.title,
          body: note.body,
        }
      );

      setNotes([{ _id: data, ...note }, ...notes]);
      setShowModal(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (userData) {
      axios
        .get(
          `http://` +
            window.location.hostname +
            `:5000/${userData.username}/notes/`
        )
        .then((response) => setNotes(response.data))
        .catch((error) => console.log(error.response));
    }
  }, [userData]);

  if (!userData) return <Redirect to="/" />;

  return (
    <div className="container">
      <div style={{ float: "right" }}>
        <button className="addNewNoteBtn" onClick={handleShowModal}>
          +
        </button>
      </div>
      <NotesList notes={notes} />
      <AddNoteModal
        show={showModal}
        close={handleShowModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Dashboard;
