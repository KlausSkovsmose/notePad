import React from "react";
import NoteListItem from "./NoteListItem";

const NotesList = ({ notes }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
      className="noteListWrap"
    >
      {notes ? (
        notes.map((note) => <NoteListItem key={note._id} note={note} />)
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default NotesList;
