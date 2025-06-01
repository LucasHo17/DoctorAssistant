import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NotesPage from './pages/NotesPage';
import DoctorPage from './pages/DoctorPage';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/doctor" element={isLoggedIn ? <DoctorPage/> : <Navigate to = "/login" />}/>
        <Route path="/" element={isLoggedIn ? <NotesPage/> : <Navigate to = "/login" />}/>
      </Routes>
    </Router>
  )
}

export default App;