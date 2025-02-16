import React, { useState, useRef } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import SquadDetails from './SquadDetails';
import './Graph.css';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const Graphs = () => {
  const [activePage, setActivePage] = useState(1);
  const [selectedSquad, setSelectedSquad] = useState(null);
  const scrollContainerRef = useRef(null);

  const squadData = [
    {
      id: 1,
      title: "Squad 1",
      heartHealth: {
        normal: 15,
        irregular: 5,
        abnormal: 3,
        soldiers: [
          { name: "John Doe", bloodO2: 98, heartRate: 72, status: "normal" },
          { name: "Jane Smith", bloodO2: 95, heartRate: 82, status: "irregular" },
          { name: "Mike Johnson", bloodO2: 92, heartRate: 95, status: "abnormal" },
          { name: "Sarah Wilson", bloodO2: 99, heartRate: 70, status: "normal" },
          { name: "Tom Brown", bloodO2: 97, heartRate: 75, status: "normal" }
        ]
      },
      sleepHealth: {
        good: 12,
        irregular: 8,
        insomniac: 3,
        soldiers: [
          { name: "John Doe", sleepDuration: 7.5, status: "good" },
          { name: "Jane Smith", sleepDuration: 5.5, status: "irregular" },
          { name: "Mike Johnson", sleepDuration: 3.5, status: "insomniac" },
          { name: "Sarah Wilson", sleepDuration: 7.2, status: "good" },
          { name: "Tom Brown", sleepDuration: 6.8, status: "good" }
        ]
      }
    },
    {
      id: 2,
      title: "Squad 2",
      heartHealth: {
        normal: 12,
        irregular: 6,
        abnormal: 4,
        soldiers: [
          { name: "Alex Turner", bloodO2: 96, heartRate: 68, status: "normal" },
          { name: "Emma Davis", bloodO2: 94, heartRate: 88, status: "irregular" },
          { name: "Chris Martin", bloodO2: 91, heartRate: 98, status: "abnormal" },
          { name: "Lisa Anderson", bloodO2: 93, heartRate: 86, status: "irregular" },
          { name: "David Wilson", bloodO2: 97, heartRate: 71, status: "normal" }
        ]
      },
      sleepHealth: {
        good: 10,
        irregular: 7,
        insomniac: 5,
        soldiers: [
          { name: "Alex Turner", sleepDuration: 7.8, status: "good" },
          { name: "Emma Davis", sleepDuration: 5.8, status: "irregular" },
          { name: "Chris Martin", sleepDuration: 3.8, status: "insomniac" },
          { name: "Lisa Anderson", sleepDuration: 6.2, status: "irregular" },
          { name: "David Wilson", sleepDuration: 7.1, status: "good" }
        ]
      }
    },
    {
      id: 3,
      title: "Squad 3",
      heartHealth: {
        normal: 18,
        irregular: 3,
        abnormal: 2,
        soldiers: [
          { name: "Ryan Cooper", bloodO2: 99, heartRate: 70, status: "normal" },
          { name: "Emily White", bloodO2: 98, heartRate: 73, status: "normal" },
          { name: "James Taylor", bloodO2: 91, heartRate: 96, status: "abnormal" },
          { name: "Sophie Brown", bloodO2: 97, heartRate: 74, status: "normal" },
          { name: "Daniel Lee", bloodO2: 95, heartRate: 84, status: "irregular" }
        ]
      },
      sleepHealth: {
        good: 15,
        irregular: 5,
        insomniac: 3,
        soldiers: [
          { name: "Ryan Cooper", sleepDuration: 7.9, status: "good" },
          { name: "Emily White", sleepDuration: 5.2, status: "irregular" },
          { name: "James Taylor", sleepDuration: 3.2, status: "insomniac" },
          { name: "Sophie Brown", sleepDuration: 7.5, status: "good" },
          { name: "Daniel Lee", sleepDuration: 6.9, status: "good" }
        ]
      }
    },
    {
      id: 4,
      title: "Squad 4",
      heartHealth: {
        normal: 14,
        irregular: 4,
        abnormal: 5,
        soldiers: [
          { name: "Oliver Smith", bloodO2: 98, heartRate: 71, status: "normal" },
          { name: "Ava Johnson", bloodO2: 92, heartRate: 94, status: "abnormal" },
          { name: "William Davis", bloodO2: 94, heartRate: 85, status: "irregular" },
          { name: "Mia Wilson", bloodO2: 91, heartRate: 97, status: "abnormal" },
          { name: "Henry Taylor", bloodO2: 97, heartRate: 73, status: "normal" }
        ]
      },
      sleepHealth: {
        good: 11,
        irregular: 6,
        insomniac: 6,
        soldiers: [
          { name: "Oliver Smith", sleepDuration: 7.3, status: "good" },
          { name: "Ava Johnson", sleepDuration: 4.8, status: "insomniac" },
          { name: "William Davis", sleepDuration: 5.9, status: "irregular" },
          { name: "Mia Wilson", sleepDuration: 4.2, status: "insomniac" },
          { name: "Henry Taylor", sleepDuration: 7.0, status: "good" }
        ]
      }
    }
  ];

  const getPieChartData = (data) => ({
    labels: ['Normal', 'Irregular', 'Abnormal'],
    datasets: [{
      data: [data.heartHealth.normal, data.heartHealth.irregular, data.heartHealth.abnormal],
      backgroundColor: [
        '#4CAF50',
        '#FFC107',
        '#F44336'
      ],
      borderWidth: 1
    }]
  });

  const getBarChartData = (data) => ({
    labels: ['Good', 'Irregular', 'Insomniac'],
    datasets: [{
      data: [data.sleepHealth.good, data.sleepHealth.irregular, data.sleepHealth.insomniac],
      backgroundColor: [
        'rgba(76, 175, 80, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(244, 67, 54, 0.8)'
      ],
      borderColor: [
        '#4CAF50',
        '#FFC107',
        '#F44336'
      ],
      borderWidth: 1,
      borderRadius: 4
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
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
          font: {
            size: 10
          }
        },
        grid: {
          display: true,
          drawBorder: false
        },
        max: 20
      },
      x: {
        ticks: {
          font: {
            size: 10
          }
        },
        grid: {
          display: false
        }
      }
    },
    barThickness: 30,
    maxBarThickness: 35
  };

  const handleBack = () => {
    setSelectedSquad(null);
    setTimeout(() => {
      if (scrollContainerRef.current) {
        const pageWidth = scrollContainerRef.current.offsetWidth;
        const scrollPosition = (activePage - 1) * pageWidth;
        scrollContainerRef.current.scrollLeft = scrollPosition;
      }
    }, 0);
  };

  const handleScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollLeft;
    const pageWidth = container.offsetWidth;
    const currentPage = Math.round(scrollPosition / pageWidth) + 1;
    setActivePage(currentPage);
  };

  if (selectedSquad) {
    return <SquadDetails squad={selectedSquad} onBack={handleBack} />;
  }

  return (
    <div className="graphs-page">
      <h1>Squad Health Analytics</h1>
      
      <div className="graphs-section">
        <div 
          ref={scrollContainerRef}
          className="graphs-scroll-container" 
          onScroll={handleScroll}
        >
          {squadData.map((squad) => (
            <div 
              key={squad.id} 
              className="graph-card"
              onClick={() => setSelectedSquad(squad)}
              style={{ cursor: 'pointer' }}
            >
              <h2>{squad.title}</h2>
              <div className="charts-container">
                <div className="chart-wrapper">
                  <h3 className="chart-title">Heart Health</h3>
                  <div className="pie-chart-container">
                    <Pie 
                      data={getPieChartData(squad)}
                      options={pieOptions}
                    />
                  </div>
                </div>
                <div className="chart-wrapper">
                  <h3 className="chart-title">Sleep Health</h3>
                  <div className="bar-chart-container">
                    <Bar 
                      data={getBarChartData(squad)}
                      options={barOptions}
                    />
                  </div>
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