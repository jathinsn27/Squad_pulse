import React from 'react';
import './SquadDetails.css';

const SquadDetails = ({ squad, onBack }) => {
  // Function to calculate fit score based on all health metrics
  const calculateFitScore = (soldier, stepData) => {
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
    if (soldier.sleepDuration >= 7) score += 25;
    else if (soldier.sleepDuration >= 6) score += 20;
    else if (soldier.sleepDuration >= 4) score += 15;

    // Step count scoring (max 25 points)
    if (stepData.steps >= 12000) score += 25;
    else if (stepData.steps >= 10000) score += 20;
    else if (stepData.steps >= 8000) score += 15;
    
    return score;
  };

  // Combine health data for each soldier
  const combinedSoldierData = squad.heartHealth.soldiers.map((soldier, index) => {
    const sleepData = squad.sleepHealth.soldiers[index];
    const stepData = squad.stepCount.soldiers[index];
    return {
      ...soldier,
      sleepDuration: sleepData.sleepDuration,
      steps: stepData.steps,
      fitScore: calculateFitScore(
        { ...soldier, sleepDuration: sleepData.sleepDuration },
        stepData
      )
    };
  });

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
              <th>Blood O2 Level (%)</th>
              <th>Heart Rate (BPM)</th>
              <th>Deep Sleep Duration (hrs)</th>
              <th>Daily Steps</th>
              <th>Fit Score</th>
            </tr>
          </thead>
          <tbody>
            {combinedSoldierData.map((soldier, index) => (
              <tr key={index}>
                <td>{soldier.name}</td>
                <td>{soldier.bloodO2}%</td>
                <td>{soldier.heartRate}</td>
                <td>{soldier.sleepDuration}</td>
                <td>{soldier.steps.toLocaleString()}</td>
                <td>
                  <span className={`fit-score ${
                    soldier.fitScore >= 80 ? 'excellent' :
                    soldier.fitScore >= 60 ? 'good' :
                    'needs-improvement'
                  }`}>
                    {soldier.fitScore}
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