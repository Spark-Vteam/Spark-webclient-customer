import './App.css';
import './components/css/Typography.css';
import './components/css/Buttons.css';
import './components/css/Navbar.css';
import './components/css/Footer.css';
import './components/css/Form.css';
import './components/css/Toast.css';
import './components/css/Table.css';
import './components/css/Img.css';
import Cell from './img/cell.png';
import Spark from './img/Spark-heading.png';
import Home from './components/Home';
import { useState, useEffect } from 'react';
import NavbarStart from './components/NavbarStart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const CLIENT_ID = 'b413f1d7c7497d7b8e6a';

function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({
    login: '',
    email: '',
    name: '',
    avatar_url: '',
    id: '',
  });
  const [, setValue] = useState('');

  async function getAccessToken(codeParam: string | null) {
    await fetch('http://localhost:4000/v1/auth/getAccessToken?code=' + codeParam, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem('accessToken', data.access_token);
          setRerender(!rerender);
        }
      });
    getUserData();
  }
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');
    if (codeParam && localStorage.getItem('accessToken') === null) {
      getAccessToken(codeParam);
    }
  }, []);

  async function getUserData() {
    await fetch('http://localhost:4000/v1/auth/getUserData', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        localStorage.setItem('user', data.login);
        localStorage.setItem('avatar', data.avatar_url);
      });
  }

  function login(event: any) {
    window.location.assign(
      `https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}`,
    );
    setValue(event.target.value);
  }

  function logout() {
    setRerender(!rerender);
  }

  return (
    <div className='App'>
      {localStorage.getItem('accessToken') ? (
        <Home userData={userData} logout={logout}></Home>
      ) : (
        <>
          <img src={Cell} className='bg-layer' alt='cellphone' />
          <NavbarStart />
          <div className='heading'>
            <img src={Spark} className='heading-text' alt='Spark heading' />
            <h3 className='head-text-sub'>
              <i>Green. Smart. Effective. This is how we do it.</i>
            </h3>
            <div>
              <button className='btn-login btn' value='register' onClick={login}>
                Register with GitHub <FontAwesomeIcon icon={faGithub} />
              </button>
              <p>
                Already a member?{' '}
                <button className='login-btn' value='login' onClick={login}>
                  Login
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
