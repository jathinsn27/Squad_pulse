import React from 'react';
import UserSidebar from '../sidebar/UserSidebar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="layout">
      <UserSidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;