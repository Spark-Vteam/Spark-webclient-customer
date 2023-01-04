import { Link } from 'react-router-dom';
import Logo from '../img/Logo.png';

const NavbarStart = () => {
  return (
    <div className='topnav-start'>
      <img src={Logo} width='40px' alt='logo' />
      <div className='topnav-right-start'>
        <Link to='/'> Start</Link>
      </div>
    </div>
  );
};

export default NavbarStart;
