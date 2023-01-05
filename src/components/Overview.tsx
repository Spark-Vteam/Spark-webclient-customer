import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import rentModel from '../models/rentModels';
import Scooter from '../img/scooterLeft.png';
import { Link } from 'react-router-dom';

// importing Link from react-router-dom to navigate to

const Overview = ({ userData, logout, singleUser }: any) => {
  const [rents, setRents] = useState([]);
  const user = singleUser;

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
    <>
      <Navbar userData={userData} logout={logout} />
      <div className='overview-container'>
        <div>
          <h1>
            {message} {user.FirstName}!
          </h1>
          {/* <div className='info-container'> */}
          <p>
            Number of trips with Spark: <strong className='big'>{rents.length || 0}</strong>
          </p>
          {user.PartialPayment === 0 && user.Balance === 0 ? (
            <div className='sub-container'>
              <Link to='/payment' className='payment-link'>
                {' '}
                Add payment method
              </Link>
              <p>
                <strong>
                  Seems like you not have added any Payment method. Click link above to easily add a
                  credit card or to load money to your account.
                </strong>
              </p>
            </div>
          ) : (
            <p>Everything seems up to date!</p>
          )}
          {/* </div> */}
        </div>
        {/* <img src={Scooter} className='scooter-img' alt='Scooter' /> */}
        <div id='background'></div>
        <div id='road'></div>
        <div id='scooter'>
          <img src={Scooter} className='scooter-img' alt='Scooter' />
          <div id='stop'></div>
        </div>
      </div>
    </>
  );
};

export default Overview;
