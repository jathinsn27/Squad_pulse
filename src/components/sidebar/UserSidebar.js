import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';  // We can reuse the same CSS

const UserSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h2>SquadPulse</h2>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-group">
            <Link to="/dashboard" className="nav-item active">
              <span className="icon">📊</span>
              <span>Dashboard</span>
            </Link>
            <div className="nav-item">
              <span className="icon">❤️</span>
              <span>My Health</span>
            </div>
            <div className="nav-item">
              <span className="icon">👟</span>
              <span>Activity</span>
            </div>
          </div>

          <div className="nav-group">
            <div className="nav-item">
              <span className="icon">😴</span>
              <span>Sleep Data</span>
            </div>
            <div className="nav-item">
              <span className="icon">📈</span>
              <span>Progress</span>
            </div>
            <div className="nav-item">
              <span className="icon">⚙️</span>
              <span>Settings</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserSidebar;