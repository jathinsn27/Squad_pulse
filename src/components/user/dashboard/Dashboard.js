import React, { useState } from 'react';
import './Dashboard.css';
import healthIcon from '../../../utility/health-stats.png'  // Add these images to your assets folder
import activityIcon from '../../../utility/activity.png';    // Add these images to your assets folder

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a preview URL for the selected image
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleUpload = () => {
    // Simulated upload - just show success message
    if (selectedFile) {
      alert('File uploaded successfully!');
      // Reset file selection
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-card health-stats">
          <h2>My Health Stats</h2>
          <div className="stats-container">
            <img src={healthIcon} alt="Health Statistics" className="dashboard-image" />
            <div className="stats-details">
              <div className="stat-item">
                <span className="stat-label">Heart Rate:</span>
                <span className="stat-value">72 BPM</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Blood Oxygen:</span>
                <span className="stat-value">98%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Sleep Score:</span>
                <span className="stat-value">85/100</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card activity">
          <h2>My Activity</h2>
          <div className="activity-container">
            <img src={activityIcon} alt="Activity Tracking" className="dashboard-image" />
            <div className="activity-details">
              <div className="stat-item">
                <span className="stat-label">Steps Today:</span>
                <span className="stat-value">8,547</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Distance:</span>
                <span className="stat-value">5.2 km</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Active Minutes:</span>
                <span className="stat-value">45 min</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card upload-section">
          <h2>Upload Health Document</h2>
          <div className="upload-container">
            {previewUrl ? (
              <div className="preview-container">
                <img src={previewUrl} alt="Preview" className="file-preview" />
                <button className="remove-button" onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}>
                  Remove
                </button>
              </div>
            ) : (
              <div className="upload-box">
                <input
                  type="file"
                  id="file-upload"
                  className="file-input"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <label htmlFor="file-upload" className="upload-label">
                  <i className="upload-icon">📁</i>
                  <span>Choose a file or drag it here</span>
                </label>
              </div>
            )}
            {selectedFile && (
              <button className="upload-button" onClick={handleUpload}>
                Upload Document
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;