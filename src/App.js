import React from 'react';
import './App.css';
import './styles/global.css';
// import Sidebar from './components/sidebar/Sidebar';
// import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Graphs from './components/graphs/Graphs';

function App() {
  return (
    // <div className="app">
    //   <Sidebar />
    //   <main className="main-content">
    //     <Dashboard />
    //   </main>
    <Router>
      <Layout>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/users" element={<Users />} /> */}
        <Route path="/graphs" element={<Graphs />} />
        
      </Routes>
      </Layout>
    </Router>
    // </div>
  );
}

export default App; 