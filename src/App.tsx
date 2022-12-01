import './App.css';
import './components/Typography.css';
import './components/Buttons.css';
import './components/Navbar.css';
import './components/Footer.css';
import authModel from './models/authModel';

import Home from './components/Home';
import About from './components/About';
import Policy from './components/Policy';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import Register from './components/Register';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState();

  // const PATH = '/';
  // const CLIENT_ID = 'b413f1d7c7497d7b8e6a';
  // const REDIRECT_URL = 'http://localhost:4000/github/callback/';

    /**
   * fetch stations from API
   * @returns {Promise<void>}
   */
     async function fetchUser(): Promise<void> {
      const usr = await authModel.getUser();
      setUser(usr);
    }
  
    useEffect(() => {
      (async () => {
        await fetchUser();
      })();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='App'>
      {/* <a
        className='btn'
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}?path=${PATH}&scope=user:email`}
      >
        Login with Github
      </a> */}
      <Navbar user={user} fetchUser={fetchUser} />
      <Routes>
        <Route path='/' element={user ? <Navigate to='/overview' /> : <Home />} />
        <Route path='/overview' element={<Overview user={user} />} />
        <Route path='/about' element={<About />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
