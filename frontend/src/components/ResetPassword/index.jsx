import React, { useState } from 'react';
import { resetPassword } from '../../api';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './resetpassword.css';

const ResetPassword = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      if (password === confirmPassword) {
        setLoading(true);
        await resetPassword({ email, password });
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="auth-logo">
        <h1>Taskify</h1>
        <p>Organize your tasks, simplify your life</p>
      </div>
      <div className="login-containerv2">
        <button
          className="back-link"
          onClick={() => navigate('/forgot-password')}
        >
          <FiArrowLeft /> Back to Forgot Password
        </button>
        <h2>Reset Password</h2>
        <p className="auth-description">
          Please enter your new password below.
        </p>
        <div className="input-container">
          <label>NEW PASSWORD</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            type="password"
            required
          />
        </div>
        <div className="input-container">
          <label>CONFIRM PASSWORD</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-type your new password"
            type="password"
            required
          />
        </div>
        <button className="login-btn" onClick={handleResetPassword}>
          {loading ? 'Resetting password...' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
