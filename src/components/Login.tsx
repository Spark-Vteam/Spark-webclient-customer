import React from 'react';
// importing Link from react-router-dom to navigate to
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='topnav-right'>
      <Link to='/'> Home</Link>
      <Link to='/about'> About</Link>
      <Link to='/policy'> Policy</Link>
      <p>Login</p>
    </div>
  );
};

export default Login;
