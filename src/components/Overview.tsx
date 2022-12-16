import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import rentModel from '../models/rentModels';

// importing Link from react-router-dom to navigate to

const Overview = ({ userData, logout, singleUser }: any) => {
  const [rents, setRents] = useState([]);
  const user = singleUser[0];

  /**
   * fetch users from API
   * @returns {Promise<void>}
   */
  async function fetchRents(): Promise<void> {
    const users = await rentModel.getRentsByUser(user.id);
    setRents(users);
  }

  useEffect(() => {
    (async () => {
      await fetchRents();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const today = new Date();
  const curHr = today.getHours();
  let message = '';

  if (curHr < 12) {
    message = 'Good morning';
  } else if (curHr < 18) {
    message = 'Good afternoon';
  } else {
    message = 'Good evening';
  }

  return (
    <div className='App'>
      <Navbar userData={userData} logout={logout} />
      <div className='App2'>
        <h1>
          {message} {user.FirstName}!
        </h1>
        {/* <div className='info-container'> */}
        <p>
          Number of trips with Spark: <strong className='big'>{rents.length}</strong>
        </p>
        <p>
          Time spent with Spark: <strong className='big'>128 minutes</strong>
        </p>
        <p>
          Most visited city with Spark: <strong className='big'>Lund</strong>
        </p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Overview;
