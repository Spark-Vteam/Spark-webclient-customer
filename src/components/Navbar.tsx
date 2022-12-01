import { Link, useNavigate } from 'react-router-dom';
import Logo from '../img/Logo.png';
import authModel from '../models/authModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Navbar = ({ user, fetchUser }: any) => {
  const navigate = useNavigate();

  async function logout() {
    await authModel.logout();
    navigate('/');
    window.location.reload();
  }

  const PATH = '/';
  const CLIENT_ID = 'b413f1d7c7497d7b8e6a';
  const REDIRECT_URL = 'http://localhost:4000/github/callback/';

  console.log(user);

  return (
    <div className='topnav'>
      <img src={Logo} width='50px' alt='logo' />
      {user ? (
        <div className='topnav-right'>
          <Link to='/'> Overview</Link>
          <Link to='/about'> Invoices</Link>
          <Link to='/policy'> Policy</Link>
          <button className='btn-logout btn'>
            <Link to='/#/' onClick={logout}>
              Log out
            </Link>
          </button>
        </div>
      ) : (
        <div className='topnav-right'>
          <Link to='/'> Home</Link>
          <Link to='/about'> About</Link>
          <Link to='/policy'> Policy</Link>
          <button className='btn-login btn'>
            <a
              className='login-link'
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}?path=${PATH}&scope=user:email`}
            >
              Login with Github <FontAwesomeIcon icon={faGithub} />
            </a>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
