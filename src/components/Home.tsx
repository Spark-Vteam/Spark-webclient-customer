import React from 'react';
// importing Link from react-router-dom to navigate to
import { Link } from 'react-router-dom';
import Cell from '../img/cell.png';
import Logo from '../img/Logo.png';
import Spark from '../img/Spark-heading.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Home = () => {
  return (
    <div className='App'>
      <img src={Cell} className='bg-layer' alt='cellphone' />
      <div className='topnav'>
        <img src={Logo} width='50px' alt='logo' />
        <div className='topnav-right'>
          <Link to='/'> Home</Link>
          <Link to='/about'> About</Link>
          <Link to='/policy'> Policy</Link>
        </div>
      </div>
      <div className='heading'>
        <img src={Spark} className='heading-text' alt='Spark heading' />
        <h3 className='head-text-sub'>
          <i>Green. Smart. Effective. This is how we do it.</i>
        </h3>
        <div>
          <Link to='/login' className='btn margin-top'>
            Login with GitHub <FontAwesomeIcon icon={faGithub} />
          </Link>
          {/* <a className="btn" href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDRIRECT}?path=${PATH}&scope=user:email?callback=http://localhost:3000!/success/`}>Login with Github</a> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
