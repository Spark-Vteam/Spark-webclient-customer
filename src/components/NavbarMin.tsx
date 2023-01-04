// import { Link } from 'react-router-dom';
import Logo from '../img/Logo.png';

const Navbar = ({ logout }: any) => {
  return (
    <div className='topnav'>
      <img src={Logo} width='40px' alt='logo' />
      <div className='topnav-right'>
        <button
          className='btn-logout btn'
          onClick={() => {
            localStorage.removeItem('accessToken');
            logout();
          }}
        >
          <a color='#fff' href='http://localhost:3000/'>
            Log out
          </a>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
