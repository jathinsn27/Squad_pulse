import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h2>SquadPulse</h2>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-group">
            <Link to="/admin/graphs" className="nav-item active">
              <span className="icon">📊</span>
              <span>Graphs</span>
            </Link>
            <div className="nav-item">
              <span className="icon">💓</span>
              <span>Health Metrics</span>
            </div>
            <div className="nav-item">
              <span className="icon">⚡</span>
              <span>Active Alerts</span>
            </div>
          </div>

          <div className="nav-group">
            <div className="nav-item">
              <span className="icon">👥</span>
              <span>Squad Members</span>
            </div>
            <div className="nav-item">
              <span className="icon">📅</span>
              <span>Reports</span>
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

export default Sidebar;