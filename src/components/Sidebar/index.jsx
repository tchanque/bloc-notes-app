import ReactMarkdown from "react-markdown";

const Sidebar = ({
  notes,
  onAddNote,
  activeNote,
  setActiveNote,
  deleteNote,
}) => {

  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="sidebar">
      <button className="sidebar__add-note-btn" onClick={onAddNote}>
        Ajouter une note
      </button>

      <div className="sidebar__preview-div">
        {sortedNotes.map((note) => (
          <div
            className={`note-preview ${note.id === activeNote.id && "active"}`}
            key={note.id}
            onClick={() => setActiveNote(note)}
          >
            <div className="note-preview-header">
              <h1 className="note-preview-title">{note.title}</h1>
              <button className="delete-btn" onClick={() => deleteNote(note.id)}>Supprimer</button>
            </div>
            <ReactMarkdown>
              {note.body}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
