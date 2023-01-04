import { Link } from 'react-router-dom';
import Logo from '../img/Logo.png';

const Navbar = ({ logout }: any) => {
  return (
    <div className='topnav'>
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
  );
};

export default Navbar;
