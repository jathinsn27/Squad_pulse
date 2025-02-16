import React, { useState } from 'react';
import './Graph.css';

const Graphs = () => {
  const [activePage, setActivePage] = useState(1);

  const graphOptions = [
    {
      id: 1,
      title: "Activity Trends",
      description: "View your daily and weekly activity patterns",
      icon: "📈"
    },
    {
      id: 2,
      title: "Sleep Analysis",
      description: "Track your sleep quality and duration",
      icon: "😴"
    },
    {
      id: 3,
      title: "Nutrition Metrics",
      description: "Monitor your dietary habits and intake",
      icon: "🥗"
    },
    {
      id: 4,
      title: "Fitness Progress",
      description: "Track your workout achievements",
      icon: "💪"
    }
  ];

  const handleScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollLeft;
    const pageWidth = container.offsetWidth;
    const currentPage = Math.round(scrollPosition / pageWidth) + 1;
    setActivePage(currentPage);
  };

  return (
    <div className="graphs-page">
      <h1>Health Analytics</h1>
      
      <div className="graphs-section">
        <div className="graphs-scroll-container" onScroll={handleScroll}>
          {graphOptions.map((option) => (
            <div key={option.id} className="graph-card">
              <div className="graph-icon">{option.icon}</div>
              <h2>{option.title}</h2>
              <p>{option.description}</p>
              <button className="view-button">View Details</button>
            </div>
          ))}
        </div>
        
        <div className="page-indicators">
          {graphOptions.map((_, index) => (
            <div 
              key={index} 
              className={`indicator ${activePage === index + 1 ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Graphs;