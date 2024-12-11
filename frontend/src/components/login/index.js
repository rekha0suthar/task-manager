import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useGoogleLogin } from '@react-oauth/google';
import { signinGoogle, signin } from '../../utils';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    signinGoogle(accessToken, navigate, setLoading);
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      signin({ email, password }, navigate, setLoading);
    }
  }

  return (
    <div className="login-container">
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
        <span className="or">or</span>
        <button onClick={() => login()} className="google-btn">
          <FaGoogle />{' '}
          {loading ? 'Signing in please wait' : 'Sign in with google'}
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
