// import { Link } from 'react-router-dom';
import Logo from '../img/Logo.png';

const Navbar = ({ logout }: any) => {
  return (
    <div className='topnav'>
      <img src={Logo} width='50px' alt='logo' />
      <div className='topnav-right'>
        <button
          className='btn-logout btn'
          onClick={() => {
            localStorage.removeItem('accessToken');
            logout();
          }}
        >
          <a color="#fff" href='http://localhost:3000/'>Log out</a>
        </button>

        {/* <img
          className='profile-img'
          title='My account'
          width='50px'
          height='50px'
          src={userData.avatar_url}
          alt='GitHub profile picture'
        ></img> */}
      </div>
    </div>
  );
};

export default Navbar;
