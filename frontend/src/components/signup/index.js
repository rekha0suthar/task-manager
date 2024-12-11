import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { signup, signupGoogle } from '../../utils';

const InitState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const nagivate = useNavigate();
  const [sForm, setsForm] = useState(InitState);

  const handleChange = (e) =>
    setsForm({
      ...sForm,
      [e.target.name]: e.target.value,
    });

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    signupGoogle(accessToken, nagivate);
  }

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
      signup(sForm, nagivate);
    }
  }

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  return (
    <div className="login-container">
      <div className="login-containerv2">
        <h3>Create your account</h3>

        <div className="input-container">
          <label>FRIST NAME</label>
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

        <div className="d">
          <div>
            Already Signed Up? <Link to="/">Login</Link>
          </div>
          {/* <div>
            <Link to="/account/forgotpassword">Forgot Password?</Link>
          </div> */}
        </div>

        <button onClick={handleOnSubmit} className="login-btn">
          REGISTER
        </button>
        <span className="or">or</span>
        <button onClick={() => login()} className="google-btn">
          <i className="fa-brands fa-google"></i> Sign up with google
        </button>
      </div>
    </div>
  );
};

export default Signup;
