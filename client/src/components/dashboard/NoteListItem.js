import React from "react";
import "./NoteListItem.css";

const NoteListItem = ({ note }) => {
  // Parse date
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return (
    <div className="noteBox">
      <h2>{note.title.substring(0, 35)}</h2>
      <div className="noteActions">
        <button>
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button>
          <i className="fas fa-trash-alt"></i>
        </button>
        <button>
          <i className="fas fa-eye"></i>
        </button>
      </div>
      <p className="noteDate">
        <i style={{ marginRight: 5 }} className="fas fa-calendar-alt"></i>{" "}
        {formatDate(note.createdDate)}
      </p>
      <p>{note.body.substring(0, 190)}...</p>
    </div>
  );
};

export default NoteListItem;
