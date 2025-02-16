import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Dashboard />
      </main>
    </div>
  );
}

export default App; 