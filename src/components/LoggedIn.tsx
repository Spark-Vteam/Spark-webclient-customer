import History from './History';
import Overview from './Overview';
import Payment from './Payment';
import UpdateUser from './UpdateUser';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import userModel from '../models/userModels';
// importing Link from react-router-dom to navigate to

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
        <Route
          path='/update'
          element={<UpdateUser userData={userData} logout={logout} singleUser={singleUser} />}
        />
      </Routes>
    </>
  );
};

export default LoggedIn;
