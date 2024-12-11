import React, { useState } from 'react';
import { resetPassword } from '../../api';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      if (password === confirmPassword) {
        await resetPassword({ email, password });
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login-container">
      <div className="login-containerv2">
        <h2>Welcome back</h2>
        <div className="input-container">
          <label>PASSWORD</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
            required
          />
        </div>
        <div className="input-container">
          <label>CONFIRM PASSWORD</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-type password"
            type="password"
            required
          />
        </div>
        <button className="login-btn" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
