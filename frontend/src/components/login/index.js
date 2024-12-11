import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useGoogleLogin } from '@react-oauth/google';
import { signinGoogle, signin } from '../../utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    signinGoogle(accessToken, navigate);
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      signin({ email, password }, navigate);
    }
  }

  return (
    <div className="login-container">
      <div className="login-containerv2">
        <h3>Welcome back</h3>

        <div className="input-container">
          <label>EMAIL</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
          />
        </div>

        <div className="input-container">
          <label>PASSWORD</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
          />
        </div>

        <div className="forgetme-container">
          <div>
            <input type="checkbox" /> Remember Me
          </div>
          {/* <div>
            <Link to="/account/forgotpassowrd">Forgot password?</Link>
          </div> */}
        </div>

        <button onClick={handleSubmit} className="login-btn">
          LOGIN
        </button>
        <span className="or">or</span>
        <button onClick={() => login()} className="google-btn">
          <i className="fa-brands fa-google"></i> Sign in with google
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
