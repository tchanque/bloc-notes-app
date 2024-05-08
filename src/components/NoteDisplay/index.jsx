import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const NoteDisplay = ({ activeNote, saveNote }) => {
  const [newContent, setNewContent] = useState({});

  useEffect(() => {
    setNewContent(activeNote);
  }, [activeNote]);

  const onUpdateField = (key, value) => {
    console.log("Updating the " + key + " of the note (not saved)");
    setNewContent((prevContent) => ({
      ...prevContent,
      [key]: value,
      lastModified: Date.now(),
    }));
  };

  if (!activeNote) {
    return (
      <div className="empty-screen">
        <p>Aucune note n'est sélectionnée</p>
      </div>
    );
  }

  return (
    <div className="note-display">
      <div className="note-html" key={activeNote.id}>
        <h1 className="note-html__title">{newContent && newContent.title}</h1>
        <ReactMarkdown className="note-html__content">
        {newContent && newContent.body}
        </ReactMarkdown>
      </div>
      <div className="note-markdown">
        <input
          id="title"
          type="text"
          onChange={(e) => onUpdateField("title", e.target.value)}
          value={!newContent ? activeNote.title : newContent.title}
        />
        <textarea
          id="body"
          type="text"
          value={!newContent ? activeNote.body : newContent.body}
          onChange={(e) => onUpdateField("body", e.target.value)}
        />
        <button
          className="note-markdown__save-btn"
          onClick={() => saveNote(newContent)}
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default NoteDisplay;
