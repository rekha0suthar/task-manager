import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleForgetPassword = () => {
    setLoading(true);
    localStorage.setItem('email', email);
    navigate('/reset-password');
  };

  return (
    <div className="login-container">
      <div className="auth-logo">
        <h1>Taskify</h1>
        <p>Organize your tasks, simplify your life</p>
      </div>
      <div className="login-containerv2">
        <button className="back-link" onClick={() => navigate('/')}>
          <FiArrowLeft /> Back to Login
        </button>
        <h2>Forgot Password</h2>
        <p className="auth-description">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

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
          {loading ? 'Sending reset link...' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
