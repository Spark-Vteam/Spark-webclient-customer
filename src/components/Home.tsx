import React from 'react';
// importing Link from react-router-dom to navigate to
import Cell from '../img/cell.png';
import Spark from '../img/Spark-heading.png';
import Login from './Login';

const Home = () => {
  return (
    <div className='App'>
      <img src={Cell} className='bg-layer' alt='cellphone' />
      {/* <Navbar /> */}
      <div className='heading'>
        <img src={Spark} className='heading-text' alt='Spark heading' />
        <h3 className='head-text-sub'>
          <i>Green. Smart. Effective. This is how we do it.</i>
        </h3>
        {/* <Login/> */}
      </div>
    </div>
  );
};

export default Home;
