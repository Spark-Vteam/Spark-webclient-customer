import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import rentModel from '../models/rentModels';
import Scooter from '../img/scooterLeft.png';
import Sunrise from '../img/Sundown.png';
import Sun from '../img/sun.png';
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

  console.log(user);

  return (
    <>
      <Navbar userData={userData} logout={logout} />
      <div className='overview-container'>
        <div className='greeting-container'>
          <div className='content'>
            <h1>
              {message} {user.FirstName}!
            </h1>
            {/* <div className='info-container'> */}
            <p>
              Number of trips with Spark: <strong className='big'>{rents.length || 0}</strong>
            </p>
            {user.PartialPayment === null || user.Balance === 0 ? (
              <div className='sub-container'>
                <Link to='/payment' className='payment-link'>
                  {' '}
                  Add payment method
                </Link>
                <p>
                  <strong>
                    Seems like you not have added a balance or credit card. Click link above to
                    easily add a credit card or to load money to your account.
                  </strong>
                </p>
              </div>
            ) : (
              <p>Everything seems up to date!</p>
            )}
          </div>
          <div className='content'>
            {curHr > 12 && curHr < 18 ? (
              <div className='img-container'>
                <img src={Sun} alt='Scooter' />
              </div>
            ) : (
              <div className='img-container'>
                <img src={Sunrise} alt='Scooter' />
              </div>
            )}
          </div>
        </div>
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
