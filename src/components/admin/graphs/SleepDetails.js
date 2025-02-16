import React from 'react';
import './SleepDetails.css'; 

const SleepDetails = ({ squad, onBack }) => {
  return (
    <div className="details-page">
      <div className="details-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>{squad.title} Sleep Details</h2>
      </div>
      <div className="soldiers-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Sleep Duration (hours)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {squad.sleepHealth.soldiers.map((soldier, index) => (
              <tr key={index} className={soldier.status}>
                <td>{soldier.name}</td>
                <td>{soldier.sleepDuration}</td>
                <td>
                  <span className={`status-badge ${soldier.status}`}>
                    {soldier.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SleepDetails;