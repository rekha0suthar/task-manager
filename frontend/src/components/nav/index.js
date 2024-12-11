import React from 'react';
import './nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

const Nav = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="nav-container">
      <h2 onClick={() => navigate('/dashboard')}>Task Manager</h2>
      <div>
        {token && (
          <div className="nav-user">
            <Link to="/profile" aria-label="Go to profile">
              <FaUser />
            </Link>
            <div
              onClick={handleLogOut}
              aria-label="Log out"
              role="button"
              tabIndex={0}
            >
              <AiOutlineLogout />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
