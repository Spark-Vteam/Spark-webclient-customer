import './App.css';
import './components/Typography.css';
import './components/Buttons.css';
import './components/Navbar.css';
import './components/Footer.css';
import './components/Form.css';
import Cell from './img/cell.png';
import Spark from './img/Spark-heading.png';

import Home from './components/Home';
import History from './components/History';
import Overview from './components/Overview';
import Payment from './components/Payment';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
import NavbarStart from './components/NavbarStart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { Routes, Route } from 'react-router-dom';

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
  const [singleUser, setSingleUser] = useState([]);

  async function getAccessToken(codeParam: string | null) {
    await fetch('http://localhost:4000/auth/getAccessToken?code=' + codeParam, {
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
    await fetch('http://localhost:4000/auth/getUserData', {
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

  function login() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}`,
    );
  }

  function logout() {
    setRerender(!rerender);
  }

  return (
    <div className='App'>
      {localStorage.getItem('accessToken') ? (
        <>
          <Routes>
            <Route
              path='/'
              element={
                <Home
                  userData={userData}
                  logout={logout}
                  singleUser={singleUser}
                  setSingleUser={setSingleUser}
                />
              }
            />
            <Route
              path='/history'
              element={
                <History
                  userData={userData}
                  logout={logout}
                  setSingleUser={setSingleUser}
                  singleUser={singleUser}
                />
              }
            />
            <Route
              path='/overview'
              element={<Overview userData={userData} logout={logout} singleUser={singleUser} />}
            />
            <Route
              path='/payment'
              element={<Payment userData={userData} logout={logout} singleUser={singleUser} />}
            />
          </Routes>
        </>
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
              <button className='btn-login btn' onClick={login}>
                Login with Github <FontAwesomeIcon icon={faGithub} />
              </button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
