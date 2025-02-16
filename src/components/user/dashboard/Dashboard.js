import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      {/* Add your user dashboard content here */}
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>My Health Stats</h2>
          {/* Add health statistics */}
        </div>
        <div className="dashboard-card">
          <h2>My Activity</h2>
          {/* Add activity data */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;