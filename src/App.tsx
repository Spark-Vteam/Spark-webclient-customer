import './App.css';
import './components/css/Typography.css';
import './components/css/Buttons.css';
import './components/css/Navbar.css';
import './components/css/Footer.css';
import './components/css/Form.css';
import './components/css/Toast.css';
import './components/css/Table.css';
import './components/css/Img.css';
import './components/css/Modal.css';
import './components/css/AboutPolicy.css';
import Cell from './img/cell.png';
import Spark from './img/Spark-heading.png';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import { useState } from 'react';
import NavbarStart from './components/NavbarStart';

function App() {
  const [userData, setUserData] = useState({
    login: '',
    email: '',
    name: '',
    avatar_url: '',
    id: '',
  });

  window.addEventListener('beforeunload', function () {
    console.log('loggar ut');
    window.localStorage.clear();
  });

  function logout() {
    // setRerender(!rerender);

    console.log('ska loggas ut');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    setUserData({
      login: '',
      email: '',
      name: '',
      avatar_url: '',
      id: '',
    });
  }

  return (
    <div className='App'>
      {localStorage.getItem('accessToken') || localStorage.getItem('token') ? (
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
            <Login setUserData={setUserData} />
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
