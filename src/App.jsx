import NoteDisplay from "./components/NoteDisplay";
import Sidebar from "./components/Sidebar";
import "./App.scss";
import { useState, useEffect } from "react";
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "Express yourself...",
      lastModified: Date.now(),
    };

    setNotes([...notes, newNote]);
  };

  const deleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const saveNote = (updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote.id);
  };

  return (
    <div className="wrapper">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        deleteNote={deleteNote}
      />
      <NoteDisplay activeNote={getActiveNote()} saveNote={saveNote} />
    </div>
  );
}

export default App;
