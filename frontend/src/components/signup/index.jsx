import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, isValidForm } from '../../utils/signUpUtils';
import Navbar from '../navbar';

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidForm()) return;

    signup(formData, navigate, setLoading);
  };

  return (
    <div className="login-signup-container">
      <Navbar />
      <div className="login-signup-containerv2">
        <h2>Create your account</h2>

        {['firstName', 'lastName', 'email', 'password', 'confirmPassword'].map(
          (field, idx) => (
            <div key={idx} className="input-container">
              <label>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
              <input
                name={field}
                type={
                  field.includes('password')
                    ? 'password'
                    : field === 'email'
                    ? 'email'
                    : 'text'
                }
                placeholder={`Enter your ${field
                  .replace(/([A-Z])/g, ' ')
                  .toLowerCase()}`}
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          )
        )}

        <button
          onClick={handleSubmit}
          className="login-signup-btn"
          disabled={loading}
        >
          {loading ? 'Registering, please wait...' : 'REGISTER'}
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
