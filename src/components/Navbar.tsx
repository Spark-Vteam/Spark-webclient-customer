import { Link } from 'react-router-dom';
import Logo from '../img/Logo.png';

const Navbar = (user: any) => {
  console.log('navbar', user.user);

  return (
    <div className='topnav'>
      <img src={Logo} width='50px' alt='logo' />
      <div className='topnav-right'>
        <Link to='/'> Overview</Link>
        <Link to='/policy'> Policy</Link>
        <img
          className='profile-img'
          title='My account'
          width='50px'
          height='50px'
          src={user.user.avatar_url}
          alt='GitHub profile picture'
        ></img>
      </div>
    </div>
  );
};

export default Navbar;
