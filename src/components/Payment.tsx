import React from 'react';
import Navbar from './Navbar';
// importing Link from react-router-dom to navigate to

const Policy = ({ userData, logout }: any) => {
  return (
    <div className='App'>
      <Navbar userData={userData} logout={logout} />
      <div className='container'>
        <div className='App2'>
          <h2>Current payment method</h2>
          <p>Change</p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
