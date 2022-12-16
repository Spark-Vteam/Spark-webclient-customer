import Navbar from './Navbar';
import History from './History';
import Overview from './Overview';
import Payment from './Payment';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import userModel from '../models/userModels';
// importing Link from react-router-dom to navigate to

const LoggedIn = ({ userData, logout, singleUser, gitHubId }: any) => {
  const [users, setUsers] = useState([]);

  /**
   * fetch users from API
   * @returns {Promise<void>}
   */
  async function fetchUsers(): Promise<void> {
    const users = await userModel.getUsers();
    setUsers(users);
  }

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log('I logged in', users, singleUser, gitHubId);
  return (
    <div className='App'>
      <>
        <Routes>
          <Route
            path='/'
            element={<Overview userData={userData} logout={logout} singleUser={singleUser} />}
          />
          <Route
            path='/history'
            element={<History userData={userData} logout={logout} singleUser={singleUser} />}
          />
          <Route
            path='/payment'
            element={<Payment userData={userData} logout={logout} singleUser={singleUser} />}
          />
        </Routes>
      </>
    </div>
  );
};

export default LoggedIn;
