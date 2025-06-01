import './LoginPage.css'
import {motion} from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useState } from 'react';
import { login } from '../api/auth';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await login(email, password);
        if (response.access_token) {
            localStorage.setItem('token', response.access_token);
            console.log("Token stored:", localStorage.getItem('token')); // Debugging
            navigate('/');
        } else {
            alert("Login failed: No access token received.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className='login-container'>
        <motion.div 
          className='login-form'
          initial={{ opacity: 0, y: 20 }}
				  animate={{ opacity: 1, y: 0 }}
				  transition={{ duration: 0.8, delay:0.2 }}
        > 
          <h2 className="login-header">
            LOGIN
          </h2>

          <form className='form' onSubmit={handleLogin}>
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
              minLength={6}
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              placeholder="Password"
              className="form-input"
            />

            <button type="submit" className="form-button">
              Sign In
            </button>

            <p className = "form-link-signup">
              Not a member?{""}
              <Link to = "/signup" className= "link-signup">
                Signup here
                <FaArrowRightToBracket />
              </Link>
            </p>
          </form>

        </motion.div>
    </div>
  )
}

export default LoginPage
