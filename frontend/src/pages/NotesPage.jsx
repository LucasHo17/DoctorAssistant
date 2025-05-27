import React from 'react'
import './NotesPage.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotes, deleteNote } from '../api/notes';
import { BsJournalMedical } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";



const NotesPage = () => {
  const [notes, setNotes]= useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
        getNotes()
          .then(setNotes)
          .catch(err => {
            console.error("Failed to load notes:", err);
            setNotes([]);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="notes-container">

      <nav className='navbar'>
        <h1 className='navbar-title'>
          <BsJournalMedical style={{marginRight:"0.5rem"}}/>
          <span>Your Records</span>
        </h1>
        <button onClick={handleLogout} className="logout-button">
          <CiLogout />
          Logout
        </button>
      </nav>

      <ul>
        {selectedNote && (
          <div className="note-modal">
            <div className="note-modal-content">
              <input
                value={selectedNote.title}
                onChange={(e) =>
                  setSelectedNote({ ...selectedNote, title: e.target.value })
                }
                className="note-title-input"
              />
              <p>{selectedNote.content}</p>

              <div className="note-buttons">
                <button onClick={() => setSelectedNote(null)}>Close</button>
                <button className="delete-button" onClick={async () => {
                  await deleteNote(selectedNote.timestamp);
                  setSelectedNote(null);
                  setNotes(notes.filter(n => n.timestamp !== selectedNote.timestamp));
                }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        
        {notes.map((note, index) => (
          <li 
            key={index}
            className='note-card'
            onClick={()=> setSelectedNote(note)}>
            <strong>{note.title || "Untitled"}</strong><br/>
            <button
              className = "delete-button"
              onClick={async (e) => {
                e.stopPropagation();
                await deleteNote(note.timestamp);
                setNotes(notes.filter(n => n.timestamp !== note.timestamp));
              }}>
              <MdOutlineDelete />
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/doctor")} className="meet-button">
        👨‍⚕️ Meet the Doctor
      </button>
    </div>
  )
}

export default NotesPage
