import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../../utils/signInUtils';
import { useDemo } from '../../context/DemoContext';
import Navbar from '../navbar';
import '../../styles/login.css';
import InputContainer from '../common/InputContainer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { startDemo } = useDemo();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      signin({ email, password }, navigate, setLoading);
    }
  };

  const handleDemoClick = () => {
    startDemo();
    navigate('/dashboard');
  };

  return (
    <div className="login-signup-container">
      <Navbar />
      <div className="login-signup-containerv2">
        <h2>Welcome back</h2>

        <InputContainer
          label="EMAIL"
          inputValue={email}
          setState={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email address"
        />

        <InputContainer
          label="PASSWORD"
          inputValue={password}
          setState={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
        />

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
