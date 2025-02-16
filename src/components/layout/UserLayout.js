import React from 'react';
import UserSidebar from '../sidebar/UserSidebar';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
const UserLayout = () => {
  return (
    <div className="layout">
      <UserSidebar />
      <Header userType="user" />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;