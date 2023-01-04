import { Link } from 'react-router-dom';
import Logo from '../img/Logo.png';

const NavbarStart = () => {
  return (
    <div data-testid='topnav-start' className='topnav-start'>
      <img src={Logo} width='40px' alt='logo' />
      <div data-testid='topnav-right-start' className='topnav-right-start'>
        <Link to='/'> Start</Link>
      </div>
    </div>
  );
};

export default NavbarStart;
