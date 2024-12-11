import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleForgetPassword = () => {
    localStorage.setItem('email', email);
    navigate('/reset-password');
  };
  return (
    <div className="login-container">
      <div className="login-containerv2">
        <h2>Forgot Password</h2>

        <div className="input-container">
          <label>EMAIL</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            required
          />
        </div>
        <button className="login-btn" onClick={handleForgetPassword}>
          Forgot Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
