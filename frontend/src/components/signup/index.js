import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../utils';
import Navbar from '../navbar';

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
  return (
    <div className="login-signup-signup-container">
      <Navbar />
      <div className="login-signup-containerv2">
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

        <button onClick={handleOnSubmit} className="login-signup-btn">
          {loading ? 'Registering, please wait' : 'REGISTER'}
        </button>

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
