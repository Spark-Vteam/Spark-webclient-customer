import History from './History';
import Overview from './Overview';
import Payment from './Payment';
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
      </Routes>
    </>
  );
};

export default LoggedIn;
