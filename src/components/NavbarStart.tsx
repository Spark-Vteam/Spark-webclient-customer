import { Link} from 'react-router-dom';
import Logo from '../img/Logo.png';

const NavbarStart = () => {

  return (
    <div className='topnav'>
      <img src={Logo} width='50px' alt='logo' />
      <div className='topnav-right'>
        <Link to='/'> Start</Link>
        <Link to='/about'> About</Link>
        <Link to='/policy'> Policy</Link>
      </div>
    </div>
  );
};

export default NavbarStart;
