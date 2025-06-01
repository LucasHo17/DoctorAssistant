import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NotesPage from './pages/NotesPage';
import DoctorPage from './pages/DoctorPage';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

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