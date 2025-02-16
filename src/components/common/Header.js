import React from 'react';
import './Header.css';

const Header = ({ userType }) => {
  return (
    <div className="header">
      <div className="header-right">
        <div className="user-profile">
          {userType === 'admin' ? (
            <>
              <img 
                src="/captain-america.png" // Add your image to public folder
                alt="Captain America"
                className="profile-icon"
              />
              <span className="user-name">Captain America</span>
            </>
          ) : (
            <>
              <img 
                src="/user-icon.png" // Add your image to public folder
                alt="User"
                className="profile-icon"
              />
              <span className="user-name">User</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;