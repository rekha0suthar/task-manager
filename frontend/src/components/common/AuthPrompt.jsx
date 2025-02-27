import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPrompt.css';

const AuthPrompt = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="auth-prompt-overlay">
      <div className="auth-prompt">
        <h3>Login Required</h3>
        <p>Please login to save your changes and access all features.</p>
        <div className="auth-prompt-buttons">
          <button className="auth-prompt-login" onClick={() => navigate('/')}>
            Login
          </button>
          <button className="auth-prompt-cancel" onClick={onClose}>
            Continue Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPrompt;
