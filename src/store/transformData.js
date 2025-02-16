const soldierNames = {
  squad1: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Tom Brown"],
  squad2: ["Alex Turner", "Emma Davis", "Chris Martin", "Lisa Anderson", "David Wilson"],
  squad3: ["Ryan Cooper", "Emily White", "James Taylor", "Sophie Brown", "Daniel Lee"],
  squad4: ["Oliver Smith", "Ava Johnson", "William Davis", "Mia Wilson", "Henry Taylor"]
};

const getSleepStatus = (deepSleepSeconds) => {
  // Convert seconds to hours, treating the seconds as minutes first
  const deepSleepHours = (deepSleepSeconds / 60);  // Convert to hours (since input is in minutes)
  
  // New thresholds based on 2 hours being normal
  if (deepSleepHours >= 1.5) return 'good';        // 1.5+ hours is good
  if (deepSleepHours >= 1) return 'irregular';     // 1-1.5 hours is irregular
  return 'insomniac';                              // Less than 1 hour is insomniac
};


const transformDataToSquads = (data) => {
  const results = data.results;
  const squads = [];
  
  for (let i = 0; i < results.length; i += 5) {
    const squadIndex = Math.floor(i / 5);
    const squadMembers = results.slice(i, i + 5);
    const squadNameList = soldierNames[`squad${squadIndex + 1}`];
    
    const heartHealth = {
      normal: squadMembers.filter(member => member.data.heart_rate.avg_bpm >= 60 && member.data.heart_rate.avg_bpm <= 100).length,
      irregular: squadMembers.filter(member => member.data.heart_rate.avg_bpm > 100).length,
      abnormal: squadMembers.filter(member => member.data.heart_rate.avg_bpm < 60).length,
      soldiers: squadMembers.map((member, index) => ({
        name: squadNameList[index],
        bloodO2: Math.round(member.data.oxygen.avg_saturation),
        heartRate: Math.round(member.data.heart_rate.avg_bpm),
        status: member.data.heart_rate.avg_bpm >= 60 && member.data.heart_rate.avg_bpm <= 100 ? 'normal' 
               : member.data.heart_rate.avg_bpm > 100 ? 'irregular' : 'abnormal'
      }))
    };

    // const sleepHealth = {
    //   good: squadMembers.filter(member => member.data.sleep.deep_sleep_seconds >= 21600).length,
    //   irregular: squadMembers.filter(member => member.data.sleep.deep_sleep_seconds >= 14400 && member.data.sleep.deep_sleep_seconds < 21600).length,
    //   insomniac: squadMembers.filter(member => member.data.sleep.deep_sleep_seconds < 14400).length,
    //   soldiers: squadMembers.map((member, index) => ({
    //     name: squadNameList[index],
    //     sleepDuration: +(member.data.sleep.deep_sleep_seconds / 3600).toFixed(1),
    //     status: member.data.sleep.deep_sleep_seconds >= 21600 ? 'good'
    //            : member.data.sleep.deep_sleep_seconds >= 14400 ? 'irregular' : 'insomniac'
    //   }))
    // };

    const sleepHealth = {
      good: squadMembers.filter(member => (member.data.sleep.deep_sleep_seconds / 60) >= 1.5).length,
      irregular: squadMembers.filter(member => (member.data.sleep.deep_sleep_seconds / 60) >= 1 && (member.data.sleep.deep_sleep_seconds / 60) < 1.5).length,
      insomniac: squadMembers.filter(member => (member.data.sleep.deep_sleep_seconds / 60) < 1).length,
      soldiers: squadMembers.map((member, index) => ({
        name: squadNameList[index],
        sleepDuration: +(member.data.sleep.deep_sleep_seconds / 60).toFixed(1), // Convert to hours
        status: getSleepStatus(member.data.sleep.deep_sleep_seconds)
      }))
    };

    const stepCount = {
      soldiers: squadMembers.map((member, index) => ({
        name: squadNameList[index],
        steps: member.data.steps.total_steps
      }))
    };

    squads.push({
      id: squadIndex + 1,
      title: `Squad ${squadIndex + 1}`,
      heartHealth,
      sleepHealth,
      stepCount
    });
  }

  return squads;
};

export default transformDataToSquads;