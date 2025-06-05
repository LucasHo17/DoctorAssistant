import {motion} from 'framer-motion'
import { useNavigate, Link, redirect } from 'react-router-dom'
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useState } from 'react';
import './SignupPage.css';
import { signup } from '../api/auth'; // Adjust the import path as necessary

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleSignup = async (e) => {
      e.preventDefault();
      try {
          const response = await signup(email, password, username); // Use the correct signup function
          if (response.message === "Signup successful") {
              navigate('/loading', {state: {redirectPath: "/login"}}); 
          } else {
              alert("Signup failed. Please try again.");
          }
      } catch (error) {
          console.error("Signup error:", error);
          alert("Signup failed. Please check your details.");
      }
  };
  return (
    <div className='signup-container'>
        <motion.div 
          className='signup-form'
          initial={{ opacity: 0, y: 20 }}
				  animate={{ opacity: 1, y: 0 }}
				  transition={{ duration: 0.8, delay:0.2 }}
        > 
          <h2 className="signup-header">
            Signup
          </h2>

          <form className='form' onSubmit={handleSignup}>
            <input
              required
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              placeholder="Email"
              className="form-input"
            />

            <input
              required
              type="text"
              value={username}
              onChange={e=>setUsername(e.target.value)}
              placeholder="Username"
              className="form-input"
            />

            <input
              required
              minLength={6}
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              placeholder="Password"
              className="form-input"
            />

            <button type="submit" className="form-button">
              Sign up
            </button>

            <p className = "form-link-login">
              Already have an account?{""}
              <Link to = "/login" className= "link-login">
                Login here
                <FaArrowRightToBracket />
              </Link>
            </p>
          </form>

        </motion.div>
    </div>
  )
}

export default SignupPage
