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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSquadsRequest } from '../../../store/actions/squadActions';

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
  const dispatch = useDispatch();
  const { squads, loading, error } = useSelector(state => state.squads);
  const [activePage, setActivePage] = useState(1);
  const [selectedSquad, setSelectedSquad] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchSquadsRequest());
  }, [dispatch]);

  const squadData = squads || [];

  // Add loading state
  if (loading) {
      return <div>Loading...</div>;
    }
  
  // Add error handling
  if (error) {
      return <div>Error: {error}</div>;
    }



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
      
      <div className="graphs-section" style={{ position: 'relative' }}>
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