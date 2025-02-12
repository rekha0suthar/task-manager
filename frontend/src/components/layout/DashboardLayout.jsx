import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  FiClock,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import './layout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="mobile-header">
        <div className="mobile-header-content">
          <div className="mobile-brand">
            <h1>Taskify</h1>
          </div>
          <div className="mobile-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDark ? (
                <FiSun className="icon" />
              ) : (
                <FiMoon className="icon" />
              )}
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      <div className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="brand">
          <h1>Taskify</h1>
        </div>
        <nav className="nav-menu">
          <div className="nav-items">
            <button
              className={`nav-item ${
                location.pathname === '/dashboard' ? 'active' : ''
              }`}
              onClick={() => navigate('/dashboard')}
            >
              <FiClock className="nav-icon" />
              <span>Tasks</span>
            </button>
            <button
              className={`nav-item ${
                location.pathname === '/profile' ? 'active' : ''
              }`}
              onClick={() => navigate('/profile')}
            >
              <FiUser className="nav-icon" />
              <span>Profile</span>
            </button>
          </div>
          <div className="nav-bottom">
            <button className="nav-item theme-toggle" onClick={toggleTheme}>
              {isDark ? (
                <FiSun className="nav-icon" />
              ) : (
                <FiMoon className="nav-icon" />
              )}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button className="nav-item logout-btn" onClick={handleLogout}>
              <FiLogOut className="nav-icon" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
