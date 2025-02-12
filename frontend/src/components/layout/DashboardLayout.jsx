import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { FiClock, FiMenu, FiX, FiUser } from 'react-icons/fi';
import './layout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dashboard-container">
      <div className="mobile-header">
        <div className="mobile-header-content">
          <div className="mobile-brand">
            <h1>Taskify</h1>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="brand">
          <h1>Taskify</h1>
        </div>
        <nav className="nav-menu">
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
        </nav>
      </div>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
