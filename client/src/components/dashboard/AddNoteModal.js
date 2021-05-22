import React, { useEffect, useState } from "react";

const AddNoteModal = ({ show, close, handleSubmit }) => {
  const [note, setNote] = useState({ title: "", body: "" });

  const handleChange = (e) => {
    setNote((curNote) => {
      return { ...curNote, [e.target.name]: e.target.value };
    });
  };

  const onEscape = (e) => (e.key === "Escape" && show ? close() : "");

  useEffect(() => {
    document.addEventListener("keydown", onEscape);

    return () => document.removeEventListener("keydown", onEscape);
  });

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={() => close()}>
            &times;
          </span>
          <h2>Add a New Note</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={(e) => handleSubmit(e, note)}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={note.title}
                onChange={handleChange}
              />
              <textarea
                rows={5}
                type="password"
                placeholder="Write the content of your note here..."
                name="body"
                value={note.body}
                onChange={handleChange}
              />
            </div>
            <div className="submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default AddNoteModal;
