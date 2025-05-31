import React from 'react'
import './NotesPage.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotes, deleteNote } from '../api/notes';
import { BsJournalMedical } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import {jwtDecode} from "jwt-decode";
import { BiPlusMedical } from "react-icons/bi";
import { GiStrong } from "react-icons/gi";

const NotesPage = () => {
  const [notes, setNotes]= useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp > currentTime; // Check if token is expired
    } catch (error) {
      console.error("Token decoding error:", error);
      return false; // If there's an error decoding, treat it as invalid
    }
  }

  useEffect(() => {
    if (!isTokenValid()) {
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

        {isTokenValid() ? (
          <button onClick={handleLogout} className="logout-button">
            <CiLogout />
            Logout
          </button>
        ) : (
          <div>
            <button onClick={() => navigate("/login")} className="login-button">
              Login
            </button>
            <button onClick={() => navigate("/signup")} className="signup-button">
              Signup
            </button>
          </div>
        )}

      </nav>
      {notes.length === 0 ? (
        <div className="empty-notes">
          You are healthy!
          <GiStrong />
        </div>
      ) : (
        <ul>
        {selectedNote && (
          <div className="note-modal">
            <div className="note-modal-content">
              <div className='note-header'>
                <BiPlusMedical style={{marginBottom:"1rem", marginRight:"0.5rem", color:"red", fontSize:"2rem"}}/>
                <h2 className='note-title-header'>{selectedNote.title|| "Untitled"}</h2>
              </div>
              <hr className="note-divider" />
              <p>{selectedNote.content}</p>
              <div>
                <button  className="note-close-buttons" onClick={() => setSelectedNote(null)}><IoMdClose /></button>
              </div>
            </div>
          </div>
        )}
        
        {notes.map((note, index) => (
          <li 
            key={index}
            className='note-card'
            onClick={()=> setSelectedNote(note)}>
              <div>
                <strong>{note.title || "Untitled"}</strong><br/>
                <span className="note-timestamp">
                  {new Date(note.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="note-card-buttons">
                <button
                  className='edit-title-button'
                  onClick={(e) => {
                    e.stopPropagation();
                    const newTitle = prompt("Enter new title: ", note.title || "Unitilted");
                    if (newTitle) {
                      setNotes(notes.map(n=>n.timestamp === note.timestamp ? { ...n, title: newTitle}:n))
                    }
                }}>
                  <MdOutlineEdit />
                </button>

                <button
                  className="delete-button"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await deleteNote(note.note_id); // Use note_id instead of timestamp
                    setNotes(notes.filter(n => n.note_id !== note.note_id));
                  }}
                >
                  <MdOutlineDelete />
                </button>
              </div>
          </li>
        ))}
      </ul>
      )}
      

      <button onClick={() => navigate("/doctor")} className="meet-button">
        👨‍⚕️ Meet the Doctor
      </button>
    </div>
  )
}

export default NotesPage
