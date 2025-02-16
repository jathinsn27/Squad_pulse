import React, { useState, useRef } from 'react';
import { Pie, Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
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
  RadialLinearScale,
  PointElement,
  LineElement,
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
      },
      stepCount: {
        soldiers: [
          { name: "John Doe", steps: 12500 },
          { name: "Jane Smith", steps: 8900 },
          { name: "Mike Johnson", steps: 10200 },
          { name: "Sarah Wilson", steps: 15000 },
          { name: "Tom Brown", steps: 11300 }
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
      },
      stepCount: {
        soldiers: [
          { name: "Alex Turner", steps: 13200 },
          { name: "Emma Davis", steps: 9800 },
          { name: "Chris Martin", steps: 11500 },
          { name: "Lisa Anderson", steps: 14200 },
          { name: "David Wilson", steps: 10800 }
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
          { name: "Ryan Cooper", sleepDuration: 7.8, status: "good" },
          { name: "Emily White", sleepDuration: 7.5, status: "good" },
          { name: "James Taylor", sleepDuration: 4.2, status: "insomniac" },
          { name: "Sophie Brown", sleepDuration: 7.0, status: "good" },
          { name: "Daniel Lee", sleepDuration: 5.5, status: "irregular" }
        ]
      },
      stepCount: {
        soldiers: [
          { name: "Ryan Cooper", steps: 16000 },
          { name: "Emily White", steps: 12300 },
          { name: "James Taylor", steps: 9500 },
          { name: "Sophie Brown", steps: 13800 },
          { name: "Daniel Lee", steps: 11900 }
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
          { name: "Oliver Smith", bloodO2: 97, heartRate: 71, status: "normal" },
          { name: "Ava Johnson", bloodO2: 94, heartRate: 87, status: "irregular" },
          { name: "William Davis", bloodO2: 90, heartRate: 97, status: "abnormal" },
          { name: "Mia Wilson", bloodO2: 96, heartRate: 76, status: "normal" },
          { name: "Henry Taylor", bloodO2: 98, heartRate: 72, status: "normal" }
        ]
      },
      sleepHealth: {
        good: 11,
        irregular: 6,
        insomniac: 6,
        soldiers: [
          { name: "Oliver Smith", sleepDuration: 7.2, status: "good" },
          { name: "Ava Johnson", sleepDuration: 5.8, status: "irregular" },
          { name: "William Davis", sleepDuration: 3.9, status: "insomniac" },
          { name: "Mia Wilson", sleepDuration: 6.5, status: "irregular" },
          { name: "Henry Taylor", sleepDuration: 7.4, status: "good" }
        ]
      },
      stepCount: {
        soldiers: [
          { name: "Oliver Smith", steps: 11800 },
          { name: "Ava Johnson", steps: 9200 },
          { name: "William Davis", steps: 13500 },
          { name: "Mia Wilson", steps: 10500 },
          { name: "Henry Taylor", steps: 12700 }
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

  const getStepChartData = (data) => ({
    labels: data.stepCount.soldiers.map(s => s.name.split(' ')[0]),
    datasets: [{
      label: 'Daily Steps',
      data: data.stepCount.soldiers.map(s => s.steps),
      backgroundColor: 'rgba(0, 150, 255, 0.2)',
      borderColor: 'rgba(0, 150, 255, 0.8)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(0, 150, 255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 150, 255, 1)',
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  });

  const calculateSquadStats = (squad) => {
    const soldiers = squad.heartHealth.soldiers.map((soldier, index) => {
      const sleepData = squad.sleepHealth.soldiers[index];
      const stepData = squad.stepCount.soldiers[index];
      
      // Calculate individual fit score
      let score = 0;
      
      // Blood O2 scoring (max 25 points)
      if (soldier.bloodO2 >= 97) score += 25;
      else if (soldier.bloodO2 >= 95) score += 20;
      else if (soldier.bloodO2 >= 92) score += 15;
      
      // Heart rate scoring (max 25 points)
      if (soldier.heartRate >= 60 && soldier.heartRate <= 80) score += 25;
      else if (soldier.heartRate > 80 && soldier.heartRate <= 90) score += 20;
      else if (soldier.heartRate > 90) score += 15;
      
      // Sleep duration scoring (max 25 points)
      if (sleepData.sleepDuration >= 7) score += 25;
      else if (sleepData.sleepDuration >= 6) score += 20;
      else if (sleepData.sleepDuration >= 4) score += 15;

      // Step count scoring (max 25 points)
      if (stepData.steps >= 12000) score += 25;
      else if (stepData.steps >= 10000) score += 20;
      else if (stepData.steps >= 8000) score += 15;
      
      return score;
    });

    const averageScore = Math.round(soldiers.reduce((acc, score) => acc + score, 0) / soldiers.length);
    const fitSoldiers = soldiers.filter(score => score >= 80).length;

    return { averageScore, fitSoldiers };
  };

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

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 20000,
        ticks: {
          stepSize: 5000,
          callback: (value) => value.toLocaleString(),
          font: {
            size: 10
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 10
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toLocaleString()} steps`
        }
      }
    }
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
    const currentPage = Math.floor(scrollPosition / pageWidth) + 1;
    
    // Only update if the page has actually changed
    if (currentPage !== activePage) {
      setActivePage(currentPage);
    }
  };

  // Add click handlers for the indicators
const handleIndicatorClick = (pageNumber) => {
  if (scrollContainerRef.current) {
    const pageWidth = scrollContainerRef.current.offsetWidth;
    scrollContainerRef.current.scrollLeft = (pageNumber - 1) * pageWidth;
    setActivePage(pageNumber);
  }
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
          {squadData.map((squad) => {
            const { averageScore, fitSoldiers } = calculateSquadStats(squad);
            
            return (
              <div 
                key={squad.id} 
                className="graph-card"
                onClick={() => setSelectedSquad(squad)}
                style={{ cursor: 'pointer' }}
              >
                <div className="squad-header">
                  <h2>{squad.title}</h2>
                  <div className="squad-stats">
                    <div className="stat-item">
                      <span className="stat-label">Average Fit Score:</span>
                      <span className={`stat-value ${averageScore >= 80 ? 'good' : 'needs-improvement'}`}>
                        {averageScore}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Fit Soldiers:</span>
                      <span className="stat-value good">{fitSoldiers}/{squad.heartHealth.soldiers.length}</span>
                    </div>
                  </div>
                </div>
                <div className="charts-container">
                  <div className="chart-wrapper">
                    <h3 className="chart-title">Daily Step Count</h3>
                    <div className="radar-chart-container">
                      <Radar 
                        data={getStepChartData(squad)}
                        options={radarOptions}
                        id={`radar-${squad.id}`}
                      />
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <h3 className="chart-title">Heart Health</h3>
                    <div className="pie-chart-container">
                      <Pie 
                        data={getPieChartData(squad)}
                        options={pieOptions}
                        id={`pie-${squad.id}`}
                      />
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <h3 className="chart-title">Sleep Health</h3>
                    <div className="bar-chart-container">
                      <Bar 
                        data={getBarChartData(squad)}
                        options={barOptions}
                        id={`bar-${squad.id}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="page-indicators">
          {squadData.map((_, index) => (
            <div 
              key={index} 
              className={`indicator ${activePage === index + 1 ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(index + 1)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Graphs;