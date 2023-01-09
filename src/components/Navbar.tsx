import { Link } from 'react-router-dom';
import Logo from '../img/Logo.png';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ logout }: any) => {
  const [showHb, setShowHb] = useState(false);

  function show() {
    if (showHb === true) {
      setShowHb(false);
    } else {
      setShowHb(true);
    }
  }
  return (
    <div data-testid='navbar' className='topnav'>
      <div className='hide'>
        <img src={Logo} width='40px' alt='logo' />
        <div className='topnav-right'>
          <Link to='/'>Overview</Link>
          <Link to='/history'>History</Link>
          <Link to='/payment'>Payment</Link>
          <button
            className='btn-logout btn'
            onClick={() => {
              localStorage.removeItem('accessToken');
              logout();
            }}
          >
            Log out
          </button>
        </div>
      </div>
      <div className='show'>
        <img src={Logo} width='40px' alt='logo' />
        <div className='topnav-right'>
          <button className='hb-btn' onClick={show}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          {showHb === true ? (
            <div>
              <Link to='/'>Overview</Link>
              <Link to='/history'>History</Link>
              <Link to='/payment'>Payment</Link>
              <button
                className='btn-logout btn'
                onClick={() => {
                  localStorage.removeItem('accessToken');
                  logout();
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
