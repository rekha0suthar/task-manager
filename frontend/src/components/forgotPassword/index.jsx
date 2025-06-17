import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Navbar from '../navbar';
import '../../styles/forgotpassword.css';
import InputContainer from '../common/InputContainer';

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
    <div className="login-signup-container">
      <Navbar />
      <div className="login-signup-containerv2">
        <button className="back-link" onClick={() => navigate('/')}>
          <FiArrowLeft /> Back to Login
        </button>
        <h2>Forgot Password</h2>
        <p className="auth-description">
          Enter your email address and continue to reset your password.
        </p>

        <InputContainer
          label="EMAIL"
          inputValue={email}
          setState={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email address"
        />
        <button className="login-signup-btn" onClick={handleForgetPassword}>
          {loading ? 'Sending reset link...' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
