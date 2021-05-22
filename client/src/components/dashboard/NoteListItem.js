import React from "react";

const NoteListItem = ({ note }) => {
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.body}</p>
    </div>
  );
};

export default NoteListItem;
