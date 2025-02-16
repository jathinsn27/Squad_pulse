import React from 'react';
import './App.css';
import './styles/global.css';
// import Sidebar from './components/sidebar/Sidebar';
// import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Graphs from './components/admin/graphs/Graphs';
import Dashboard from './components/user/dashboard/Dashboard';
import UserLayout from './components/layout/UserLayout';

// function App() {
//    return (
//      <Router>
//       <Layout>
//        <Routes>
//          <Route path="/admin/graphs" element={<Graphs />} />
//          <Route path="/user/dashboard" element={<Dashboard />} /> 
//        </Routes>
//        </Layout>
//      </Router> 
//    );
//  }

 function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes with Admin Layout */}
        <Route element={<Layout />}>
          <Route path="/admin/graphs" element={<Graphs />} />
        </Route>

        {/* User routes with User Layout */}
        <Route element={<UserLayout />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 