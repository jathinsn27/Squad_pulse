# SquadPulse - Military Health Monitoring System

![SquadPulse Logo](path_to_logo.png)

## Overview

SquadPulse is a comprehensive health monitoring system designed specifically for military personnel. It provides real-time health analytics and squad performance monitoring to ensure optimal readiness and well-being of military units.

## Features

### For Squad Commanders (Admin)
- **Squad Overview Dashboard**
  - Real-time health metrics visualization
  - Squad performance analytics
  - Alert system for health anomalies
  - Interactive data graphs

### For Individual Soldiers (Users)
- **Personal Health Dashboard**
  - Heart rate monitoring
  - Sleep quality tracking
  - Activity level measurement
  - Health status indicators

### Key Functionalities
- Real-time health monitoring
- Squad-wide analytics
- Early warning system for health risks
- Performance tracking
- Sleep pattern analysis
- Activity level monitoring

## Technology Stack

- **Frontend**
  - React.js
  - Redux for state management
  - Chart.js for data visualization
  - CSS3 for styling

- **Dependencies**
  ```json
  {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    "react-chartjs-2": "^5.x",
    "redux": "^4.x",
    "react-redux": "^8.x"
  }
  ```

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/squadpulse.git
   ```

2. Install dependencies
   ```bash
   cd squadpulse
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

## Project Structure

squadpulse/
├── src/
│ ├── components/
│ │ ├── admin/
│ │ │ └── graphs/
│ │ ├── user/
│ │ │ └── dashboard/
│ │ └── sidebar/
│ ├── store/
│ │ └── actions/
│ ├── assets/
│ └── App.js
├── public/
└── package.json



## Usage

### Admin Dashboard
1. Access the admin panel through `/admin/graphs`
2. View squad-wide health metrics
3. Monitor individual soldier performance
4. Receive alerts for health anomalies

### User Dashboard
1. Access personal dashboard through `/dashboard`
2. View personal health metrics
3. Track daily activity
4. Monitor sleep patterns

## Screenshots

![Admin Dashboard](path_to_admin_screenshot.png)
*Admin Dashboard showing squad health analytics*

![User Dashboard](path_to_user_screenshot.png)
*User Dashboard showing personal health metrics*

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Chart.js for data visualization
- React team for the amazing framework
- Military health monitoring standards and guidelines


## Future Enhancements

- Enhanced alert system
