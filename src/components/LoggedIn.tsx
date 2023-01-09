import History from './History';
import Overview from './Overview';
import Payment from './Payment';
import About from './About';
import Policy from './Policy';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import userModel from '../models/userModels';

const LoggedIn = ({ userData, logout, singleUser }: any) => {
  const [, setUsers] = useState([]);

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

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <div data-testid='overview-route'>
              <Overview userData={userData} logout={logout} singleUser={singleUser} />
            </div>
          }
        />
        <Route
          path='/history'
          element={
            <div data-testid='history-route'>
              <History userData={userData} logout={logout} singleUser={singleUser} />
            </div>
          }
        />
        <Route
          path='/payment'
          element={
            <div data-testid='payment-route'>
              <Payment userData={userData} logout={logout} singleUser={singleUser} />
            </div>
          }
        />
        <Route path={'/about'} element={<About userData={userData} logout={logout} />} />
        <Route path={'/policy'} element={<Policy userData={userData} logout={logout} />} />
      </Routes>
    </>
  );
};

export default LoggedIn;
