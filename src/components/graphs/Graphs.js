import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import './Graph.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const Graphs = () => {
  const [activePage, setActivePage] = useState(1);

  const squadData = [
    {
      id: 1,
      title: "Squad 1",
      heartHealth: {
        normal: 15,
        irregular: 5,
        abnormal: 3
      }
    },
    {
      id: 2,
      title: "Squad 2",
      heartHealth: {
        normal: 12,
        irregular: 6,
        abnormal: 4
      }
    },
    {
      id: 3,
      title: "Squad 3",
      heartHealth: {
        normal: 18,
        irregular: 3,
        abnormal: 2
      }
    },
    {
      id: 4,
      title: "Squad 4",
      heartHealth: {
        normal: 14,
        irregular: 4,
        abnormal: 5
      }
    }
  ];

  const getPieChartData = (data) => ({
    labels: ['Normal', 'Irregular', 'Abnormal'],
    datasets: [{
      data: [data.heartHealth.normal, data.heartHealth.irregular, data.heartHealth.abnormal],
      backgroundColor: [
        '#4CAF50', // green for normal
        '#FFC107', // yellow for irregular
        '#F44336'  // red for abnormal
      ],
      borderWidth: 1
    }]
  });

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          padding: 6,
          font: {
            size: 10
          }
        }
      }
    },
    width: 200,
    height: 200
  };

  const handleScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollLeft;
    const pageWidth = container.offsetWidth;
    const currentPage = Math.round(scrollPosition / pageWidth) + 1;
    setActivePage(currentPage);
  };

  return (
    <div className="graphs-page">
      <h1>Squad Health Analytics</h1>
      
      <div className="graphs-section">
        <div className="graphs-scroll-container" onScroll={handleScroll}>
          {squadData.map((squad) => (
            <div key={squad.id} className="graph-card">
              <h2>{squad.title}</h2>
              <div className="chart-container">
              <h3 className="chart-title">Heart Health</h3>
              <div className="pie-chart-container">
                <Pie 
                  data={getPieChartData(squad)}
                  options={pieOptions}
                />
              </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="page-indicators">
          {squadData.map((_, index) => (
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