import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { signin } from '../../utils';
import { useDemo } from '../../context/DemoContext';
import Navbar from '../navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { startDemo } = useDemo();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      signin({ email, password }, navigate, setLoading);
    }
  }

  const handleDemoClick = () => {
    startDemo();
    navigate('/dashboard');
  };

  return (
    <div className="login-signup-container">
      <Navbar />
      <div className="login-signup-containerv2">
        <h2>Welcome back</h2>

        <div className="input-container">
          <label>EMAIL</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
          />
        </div>

        <div className="input-container">
          <label>PASSWORD</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
          />
        </div>

        <div className="forgetme-container">
          <div>
            <input type="checkbox" /> Remember Me
          </div>
          <Link to="/forgot-password">Forgot password</Link>
        </div>

        <button onClick={handleSubmit} className="login-signup-btn">
          {loading ? 'Signing in please wait' : 'SIGNIN'}
        </button>

        <button onClick={handleDemoClick} className="demo-btn">
          Try Demo
        </button>
        <span className="notreg">
          Not registered yet?{' '}
          <Link className="signup-btn" to="/signup">
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
