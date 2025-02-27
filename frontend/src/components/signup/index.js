import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { signup, signupGoogle } from '../../utils';
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const InitState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const navigate = useNavigate();
  const [sForm, setsForm] = useState(InitState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setsForm({
      ...sForm,
      [e.target.name]: e.target.value,
    });

  // function handleGoogleLoginSuccess(tokenResponse) {
  //   const accessToken = tokenResponse.access_token;
  //   console.log('Google access token:', accessToken); // For debugging
  //   signupGoogle(accessToken, navigate, setLoading);
  // }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (
      sForm.firstName !== '' &&
      sForm.lastName !== '' &&
      sForm.password !== '' &&
      sForm.confirmPassword !== '' &&
      sForm.email !== '' &&
      sForm.password === sForm.confirmPassword &&
      sForm.password.length >= 4
    ) {
      signup(sForm, navigate, setLoading);
    }
  }

  // const login = useGoogleLogin({
  //   onSuccess: handleGoogleLoginSuccess,
  //   onError: (error) => {
  //     console.error('Google signup error:', error);
  //     toast.error('Failed to sign up with Google');
  //   },
  // });

  return (
    <div className="login-container">
      <div className="auth-logo">
        <h1>Taskify</h1>
        <p>Organize your tasks, simplify your life</p>
      </div>
      <div className="login-containerv2">
        <h2>Create your account</h2>

        <div className="input-container">
          <label>FIRST NAME</label>
          <input
            onChange={handleChange}
            name="firstName"
            placeholder="Enter your first name"
            type="text"
          />
        </div>
        <div className="input-container">
          <label>LAST NAME</label>
          <input
            name="lastName"
            onChange={handleChange}
            placeholder="Enter your last name"
            type="text"
          />
        </div>
        <div className="input-container">
          <label>EMAIL</label>
          <input
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            type="email"
          />
        </div>

        <div className="input-container">
          <label>PASSWORD</label>
          <input
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            type="password"
          />
        </div>

        <div className="input-container">
          <label>CONFIRM PASSWORD</label>
          <input
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Re-type your password"
            type="password"
          />
        </div>

        <button onClick={handleOnSubmit} className="login-btn">
          {loading ? 'Registering, please wait' : 'REGISTER'}
        </button>
        {/* Disabled Google Signup
        <span className="or">or</span>
        <button onClick={() => login()} className="google-btn">
          <FaGoogle />{' '}
          {loading ? 'Signing in, please wait' : 'Sign up with google'}
        </button> 
        */}
        <span className="notreg">
          Already Signed Up?{' '}
          <Link className="signup-btn" to="/">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
