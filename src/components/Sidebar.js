import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h2>TERRA<span className="api-tag">API</span></h2>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-group">
            <div className="nav-item active">
              <span className="icon">🔌</span>
              <span>Connections</span>
            </div>
            <div className="nav-item">
              <span className="icon">👥</span>
              <span>Users</span>
            </div>
            <div className="nav-item">
              <span className="icon">🔒</span>
              <span>Authentication</span>
            </div>
            <div className="nav-item">
              <span className="icon">📊</span>
              <span>Payload Simulator</span>
            </div>
            <div className="nav-item">
              <span className="icon">📜</span>
              <span>Payload History</span>
            </div>
            <div className="nav-item">
              <span className="icon">⏱️</span>
              <span>Provider Uptime</span>
            </div>
          </div>

          <div className="nav-group">
            <div className="nav-item">
              <span className="icon">📈</span>
              <span>Health Scores</span>
            </div>
            <div className="nav-item">
              <span className="icon">📊</span>
              <span>Graphs</span>
            </div>
            <div className="nav-item">
              <span className="icon">🎁</span>
              <span>Health Rewards</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 