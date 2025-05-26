import React from 'react'
import './NotesPage.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotes } from '../api/notes';

const NotesPage = () => {
  const [[notes, setNotes]]= useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getNotes().then(setNotes).catch(err => {
        console.error("Failed to load notes:", err);
      });
    }
  }, []);

  return (
    <div className="container">
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <strong>{new Date(note.timestamp).toLocaleString()}</strong><br />
            {note.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotesPage
