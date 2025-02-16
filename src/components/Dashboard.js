import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-title">
          <h1>Connections</h1>
        </div>
        <div className="header-actions">
          <select className="env-selector">
            <option>Testing</option>
            <option>Production</option>
          </select>
          <button className="header-button">
            <span className="icon">❔</span>
            Docs
          </button>
          <button className="header-button">
            <span className="icon">🎧</span>
            Support
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="section">
          <h2>Sources</h2>
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>You have no sources yet</h3>
            <p>Health data from your users comes from multiple sources, in different forms and technologies.</p>
            <button className="primary-button">+ Add Sources</button>
          </div>
        </div>

        <div className="section">
          <h2>Destinations</h2>
          <div className="empty-state">
            <div className="empty-icon">💾</div>
            <h3>You have added no destinations yet</h3>
            <p>Your destination is where user data and events are sent to after processing</p>
            <button className="primary-button">+ Add Destinations</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 