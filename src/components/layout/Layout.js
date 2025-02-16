import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <Header userType="admin" />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;