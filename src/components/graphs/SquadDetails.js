import React from 'react';
import './SquadDetails.css';

const SquadDetails = ({ squad, onBack }) => {
  return (
    <div className="details-page">
      <div className="details-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>{squad.title} Health Details</h2>
      </div>
      <div className="soldiers-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood O2 Level</th>
              <th>Heart Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {squad.heartHealth.soldiers.map((soldier, index) => (
              <tr key={index} className={soldier.status}>
                <td>{soldier.name}</td>
                <td>{soldier.bloodO2}%</td>
                <td>{soldier.heartRate} BPM</td>
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

export default SquadDetails;