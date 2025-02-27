import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useGoogleLogin } from '@react-oauth/google';
import { signinGoogle, signin } from '../../utils';
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useDemo } from '../../context/DemoContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { startDemo } = useDemo();
  const navigate = useNavigate();

  // function handleGoogleLoginSuccess(tokenResponse) {
  //   const accessToken = tokenResponse.access_token;
  //   console.log('Google access token:', accessToken); // For debugging
  //   signinGoogle(accessToken, navigate, setLoading);
  // }

  // const login = useGoogleLogin({
  //   onSuccess: handleGoogleLoginSuccess,
  //   onError: (error) => {
  //     console.error('Google login error:', error);
  //     toast.error('Failed to sign in with Google');
  //   },
  // });

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
    <div className="login-container">
      <div className="auth-logo">
        <div className="auth-logo-content">
          <h1>Taskify</h1>
          <p>Organize your tasks, simplify your life</p>
        </div>
      </div>
      <div className="login-containerv2">
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

        <button onClick={handleSubmit} className="login-btn">
          {loading ? 'Signing in please wait' : 'SIGNIN'}
        </button>
        {/* Disable Google Login
        <span className="or">or</span>
        <button onClick={() => login()} className="google-btn">
          <FaGoogle /> Sign in with Google
        </button> */}
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
